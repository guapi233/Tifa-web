import axios from "@/utils/axios";
import Vue from "vue";

/**
 * 登录
 * @param data 参数对象
 */
export const login = (data: object) => {
  return axios.post("/login/", data).then((res) => {
    if ((res as any).isOk) {
      return res;
    } else {
      Vue.prototype.$Message.error(res.data);
      return false;
    }
  })
};

/**
 * 注册
 * @param data 参数对象
 */
export const register = (data: object) => {
  return axios.post("/login/reg", data).then((res) => {
    if ((res as any).isOk) {
      return res;
    } else {
      Vue.prototype.$Message.error(res.data);
      return false;
    }
  })
}