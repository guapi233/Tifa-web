import axios from "@/utils/axios";

export const getArticleList = async (skip = 0, limit = 0) => {
  return axios.get(`/public/getArticleList?skip=${skip}&limit=${limit}`);
};

export const getArticleDetail = async (articleId: string) => {
  return axios.get(`/public/getArticleDetail?articleId=${articleId}`);
};

export const getCommentList = async (targetId: string) => {
  return axios.get(`/public/getCommentList?targetId=${targetId}`);
};

export const addComment = async (commentObj: object) => {
  return axios.post("/content/addComment", commentObj);
};
