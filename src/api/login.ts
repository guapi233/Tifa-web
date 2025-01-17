import axios from "@/utils/axios";
import { apiReturn } from "@/types/index";
import {
  loginParams,
  loginReturn,
  registerParams,
  registerReturn,
} from "@/types/api/login";

/**
 * 登录
 * @param data 参数对象
 */
export const login = (data: loginParams): apiReturn<loginReturn> => {
  return axios.post("/login/", data);
};

/**
 * 注册
 * @param data 参数对象
 */
export const register = (data: registerParams): apiReturn<registerReturn> => {
  return axios.post("/login/reg", data);
};
