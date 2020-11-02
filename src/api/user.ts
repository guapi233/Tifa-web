import axios from "@/utils/axios";

// 修改用户信息
export const editUserInfo = (userNewInfo: object) => {
  return axios.post("/user/edit", userNewInfo);
};
