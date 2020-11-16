import axios from "@/utils/axios";

export const getArticleList = async ({
  skip = 0,
  limit = 20,
  usernumber = "",
}) => {
  return axios.get(
    `/public/getArticleList?skip=${skip}&limit=${limit}&usernumber=${usernumber}`
  );
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
  const { targetId, skip, limit, sort, usernumber } = commentObj;
  return axios.get(
    `/public/getCommentList?targetId=${targetId}&skip=${skip}&limit=${limit}&sort=${sort}&usernumber=${usernumber}`
  );
};

export const addComment = async (commentObj: object) => {
  return axios.post("/content/addComment", commentObj);
};

export const addLike = async (targetId: string, type: number) => {
  return axios.get(`/content/addLike?targetId=${targetId}&type=${type}`);
};

export const getLikeList = async (targetId: string, limit: number) => {
  return axios.get(`/public/getLikeList?targetId=${targetId}&limit=${limit}`);
};

export const addCollection = async (targetId: string) => {
  return axios.get(`/content/addCollection?targetId=${targetId}`);
};

export const getFollowList = async (
  authorId: string,
  usernumber = "",
  skip = 0
) => {
  return axios.get(
    `/public/getFollowList?authorId=${authorId}&usernumber=${usernumber}&skip=${skip}`
  );
};

export const getFollowedList = async (
  targetId: string,
  usernumber = "",
  skip = 0
) => {
  return axios.get(
    `/public/getFollowedList?targetId=${targetId}&usernumber=${usernumber}&skip=${skip}`
  );
};

export const getCollectionList = async (usernumber: string) => {
  return axios.get(`/public/getCollectionList?usernumber=${usernumber}`);
};

export const getDraftList = async () => {
  return axios.get("/content/getDraftList");
};

export const getDraftDetail = async (draftId: string) => {
  return axios.get(`/content/getDraftDetail?draftId=${draftId}`);
};

export const delDraft = async (draftId: string) => {
  return axios.get(`/content/delDraft?draftId=${draftId}`);
};

export const saveDraft = async (draftObj: any) => {
  return axios.post("/content/saveDraft", draftObj);
};

export const addArticle = async (articleObj: any) => {
  return axios.post("/content/addArticle", articleObj);
};

/**
 * 获取文章详情页中推荐文章
 * @param articleId 文章Id
 * @param tags 标签
 * @param limit 条目数
 */
export const getRecArticle = async (
  articleId: string,
  tags: string[],
  limit: number
) => {
  const tagsStr = tags.join("|");

  return axios.get(
    `/public/getRecArticle?articleId=${articleId}&tags=${tagsStr}&limit=${limit}`
  );
};
