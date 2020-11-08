import axios from "@/utils/axios";

export const getArticleList = async (skip = 0, limit = 0) => {
  return axios.get(`/public/getArticleList?skip=${skip}&limit=${limit}`);
};

export const getArticleDetail = async (
  articleId: string,
  usernumber: string
) => {
  return axios.get(
    `/public/getArticleDetail?articleId=${articleId}&usernumber=${usernumber}`
  );
};

/**
 * 获取评论列表：targetId[评论对象Id]、limit[多少条]、skip[跳过多少个]、sort[created最新评论，likeCountr最热评论]
 * @param commentObj 条件对象
 */
export const getCommentList = async (commentObj: any) => {
  const { targetId, skip, limit, sort } = commentObj;
  return axios.get(
    `/public/getCommentList?targetId=${targetId}&skip=${skip}&limit=${limit}&sort=${sort}`
  );
};

export const addComment = async (commentObj: object) => {
  return axios.post("/content/addComment", commentObj);
};
