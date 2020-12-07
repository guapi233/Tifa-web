import axios from "@/utils/axios";
import { getSid, setStorage, getStorage } from "@/utils/index";

let sid = getStorage("sid");
if (!sid) {
  sid = getSid();
  setStorage("sid", sid);
}
/**
 * 获取验证码
 */
export const getCaptcha = async () => {
  return axios.get(`/public/getCaptcha?sid=${sid}`);
};

/**
 * @param id 用户账号
 */
export const getUserInfo = async (usernumber: string, self = "") => {
  if (!usernumber) return;

  return axios.get(`/public/getUserInfo?usernumber=${usernumber}&self=${self}`);
};

/**
 * 发送邮件
 * @param mailObj
 */
export const sendMail = async (mailObj: any) => {
  const { type, usernumber = "", email = "" } = mailObj;
  if (!type) return;

  return axios.get(
    `/public/sendMail?sid=${sid}&usernumber=${usernumber}&email=${email}&type=${type}`
  );
};
