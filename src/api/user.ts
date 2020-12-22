import { apiReturn } from "@/types";
import {
  editUserInfoParams,
  getBlacklistedListReturn,
  setNoticeParams,
  setPasswordParams,
} from "@/types/api/user";
import axios from "@/utils/axios";

/**
 * 编辑用户信息
 * @param userNewInfo 用户信息对象
 */
export const editUserInfo = (
  userNewInfo: editUserInfoParams
): apiReturn<any> => {
  return axios.post("/user/edit", userNewInfo);
};

/**
 * 上传头像
 * @param formData 头像信息对象
 */
export const uploadPic = (formData: { file: BufferSource }): apiReturn<any> => {
  return axios.post("/user/uploadPic", formData);
};

/**
 * 关注用户
 * @param targetId 关注目标Id
 */
export const followUser = (targetId: string): apiReturn<any> => {
  return axios.get(`/user/addFollow?targetId=${targetId}`);
};

/**
 * 设置消息通知
 * @param noticeObj 屏蔽消息对象
 */
export const setNotice = (noticeObj: setNoticeParams): apiReturn<any> => {
  return axios.post(`/user/setNotice`, noticeObj);
};

/**
 * 拉黑
 * @param targetId 目标用户Id
 */
export const setBlacklisted = (targetId: string): apiReturn<any> => {
  return axios.get(`/user/setBlacklisted?targetId=${targetId}`);
};

/**
 * 获取我拉黑的列表
 */
export const getBlacklistedList = (
  skip = 0,
  limit = 20
): apiReturn<getBlacklistedListReturn> => {
  return axios.get(`/user/getBlacklistedList?skip=${skip}&limit=${limit}`);
};

/**
 * 修改偏好设置
 * @param preferenceObj 偏好对象
 */
export const setMinePre = (preferenceObj: {
  trendVisible: number;
  collectionVisible: number;
}): apiReturn<any> => {
  return axios.post("/user/setMinePre", preferenceObj);
};

/**
 * 修改密码
 * @param passwordObj 密码信息对象
 */
export const setPassword = (passwordObj: setPasswordParams): apiReturn<any> => {
  let str = "";
  Object.keys(passwordObj).filter((key: string) => {
    str += `${key}=${passwordObj[key]}&`;
  });

  return axios.get("/user/setPassword?" + str);
};

/**
 * 设置个性域名
 * @param alias 个性域名
 */
export const setAlias = (alias: string): apiReturn<any> => {
  return axios.get(`/user/setAlias?alias=${alias}`);
};
