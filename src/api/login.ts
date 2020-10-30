import axios from "@/utils/axios";

/**
 * 登录
 * @param data 参数对象
 */
export const login = (data: object) => {
  return axios.post("/login/", data);
};

/**
 * 注册
 * @param data 参数对象
 */
export const register = (data: object) => {
  return axios.post("/login/reg", data);
};
