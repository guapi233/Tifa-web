import axios from "@/utils/axios";

/**
 * 编辑用户信息
 * @param userNewInfo 用户信息对象
 */
export const editUserInfo = (userNewInfo: object) => {
  return axios.post("/user/edit", userNewInfo);
};

/**
 * 上传头像
 * @param formData 头像信息对象
 */
export const uploadPic = (formData: any) => {
  return axios.post("/user/uploadPic", formData);
};

/**
 * 关注用户
 * @param targetId 关注目标Id
 */
export const followUser = (targetId: string) => {
  return axios.get(`/user/addFollow?targetId=${targetId}`);
};
