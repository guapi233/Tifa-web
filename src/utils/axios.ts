/**
 * 封装axios的请求，返回重新封装的数据结构
 * 对错误的统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";
import config from "@/config";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ?config.baseUrl.dev :config.baseUrl.pro,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  timeout: 10000
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  errorHandle(error);
  return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use((res) => {

  if ((res.status >= 200 && res.status < 300) || res.status === 304) {
    return res.data;
  } else {
    errorHandle("请求失败");
    return Promise.reject("请求失败");
  }

}, (error) => {
  errorHandle(error);
  return Promise.reject(error);
})