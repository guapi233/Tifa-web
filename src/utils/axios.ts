/**
 * 封装axios的请求，返回重新封装的数据结构
 * 对错误的统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";
import Vue from "vue";
import { getStorage } from "@/utils/index";
import config from "@/config";
import { response } from "@/types";
// import { isPublicApi } from "@/utils/index";

const instance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带 token
    const token = getStorage("token");
    token && (config.headers.Authorization = `bearer ${token}`);
    // if (token && !isPublicApi(config.url)) {
    //   config.headers.Authorization = `bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    errorHandle(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res: response) => {
    if ((res.status >= 200 && res.status < 300) || res.status === 304) {
      if (res.data.isOk) {
        // 尝试解析 JSON
        try {
          return JSON.parse(res.data.data);
        } catch (err) {
          return res.data.data;
        }
      } else {
        Vue.prototype.$Message.error(res.data.data);
        return false;
      }
    } else {
      errorHandle("请求失败");
      return Promise.reject("请求失败");
    }
  },
  (error) => {
    errorHandle(error);
    return Promise.reject(error);
  }
);

export default instance;
