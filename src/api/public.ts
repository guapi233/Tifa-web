import axios from "@/utils/axios";
import { getSid, setStorage, getStorage } from "@/utils/index";

let sid = getStorage("sid");

/**
 * 获取验证码
 */
export const getCaptcha = async () => {
  if (!sid) {
    sid = getSid();
    setStorage("sid", sid);
  }

  return axios.get(`/public/getCaptcha?sid=${sid}`);
};

/**
 * @param id 用户账号
 */
export const getUserInfo = async (usernumber: string, self = "") => {
  if (!usernumber) return;

  return axios.get(`/public/getUserInfo?usernumber=${usernumber}&self=${self}`);
};
