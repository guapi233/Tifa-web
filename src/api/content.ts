import axios from "@/utils/axios";

export const getArticleList = async (skip = 0, limit = 0) => {
  return axios.get(`/public/getArticleList?skip=${skip}&limit=${limit}`);
};
