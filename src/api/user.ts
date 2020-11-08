import axios from "@/utils/axios";

// 修改用户信息
export const editUserInfo = (userNewInfo: object) => {
  return axios.post("/user/edit", userNewInfo);
};

// 上传头像
export const uploadPic = (formData: any) => {
  return axios.post("/user/uploadPic", formData);
};

// 关注用户
export const followUser = (targetId: string) => {
  return axios.get(`/user/addFollow?targetId=${targetId}`);
};
