import axios from "@/utils/axios";
import { apiReturn } from "@/types/index";
import { getSid, setStorage, getStorage } from "@/utils/index";
import {
  getUserInfoReturn,
  sendMailParams,
  getTrendListReturn,
} from "@/types/api/public";

let sid = getStorage("sid");
if (!sid) {
  sid = getSid();
  setStorage("sid", sid);
}
/**
 * 获取验证码
 */
export const getCaptcha = async (): apiReturn<string> => {
  return axios.get(`/public/getCaptcha?sid=${sid}`);
};

/**
 * @param id 用户账号
 */
export const getUserInfo = async (
  usernumber: string,
  self = ""
): apiReturn<getUserInfoReturn> => {
  return axios.get(`/public/getUserInfo?usernumber=${usernumber}&self=${self}`);
};

/**
 * 发送邮件
 * @param mailObj
 */
export const sendMail = async (mailObj: sendMailParams): apiReturn<string> => {
  const { type, usernumber = "", email = "" } = mailObj;

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
export const getTrendList = async (
  authorId = "",
  skip = 0,
  limit = 20
): apiReturn<getTrendListReturn> => {
  return axios.get(
    `/public/getTrendList?authorId=${authorId}&skip=${skip}&limit=${limit}`
  );
};

/**
 * 检索
 * @param keyword 关键字
 * @param type 检索类型
 */
export const search = async (keyword: string, type: string): apiReturn<any> => {
  return axios.get(`/public/search?keyword=${keyword}&type=${type}`);
};

/**
 * 添加检索记录
 * @param keyword 关键字
 */
export const addSearch = async (keyword: string): apiReturn<string> => {
  return axios.get(`/public/addSearch?keyword=${keyword}`);
};

/**
 * 获取检索记录
 * @param keyword 关键字
 */
export const getSearch = async (keyword: string): apiReturn<any[]> => {
  return axios.get(`/public/getSearch?keyword=${keyword}`);
};
