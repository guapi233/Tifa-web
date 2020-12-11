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

/**
 * 获取动态列表
 * @param authorId 动态所有者Id
 * @param skip 跳过的条目
 * @param limit 条目数
 */
export const getTrendList = async (authorId = "", skip = 0, limit = 20) => {
  return axios.get(
    `/public/getTrendList?authorId=${authorId}&skip=${skip}&limit=${limit}`
  );
};

/**
 * 检索
 * @param keyword 关键字
 * @param type 检索类型
 */
export const search = async (keyword: string, type: string) => {
  return axios.get(`/public/search?keyword=${keyword}&type=${type}`);
};

/**
 * 添加检索记录
 * @param keyword 关键字
 */
export const addSearch = async (keyword: string) => {
  return axios.get(`/public/addSearch?keyword=${keyword}`);
};
