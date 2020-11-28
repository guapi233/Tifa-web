import axios from "@/utils/axios";

/**
 * 获取文章列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 * @param usernumber 用户名
 */
export const getArticleList = async ({
  skip = 0,
  limit = 20,
  usernumber = "",
}) => {
  return axios.get(
    `/public/getArticleList?skip=${skip}&limit=${limit}&usernumber=${usernumber}`
  );
};

/**
 * 获取文章详情
 * @param articleId 文章Id
 * @param usernumber 用户名
 */
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

/**
 * 添加评论
 * @param commentObj 评论信息对象
 */
export const addComment = async (commentObj: object) => {
  return axios.post("/content/addComment", commentObj);
};

/**
 * 点赞
 * @param targetId 点赞目标
 * @param type 点赞目标类型
 */
export const addLike = async (targetId: string, type: number) => {
  return axios.get(`/content/addLike?targetId=${targetId}&type=${type}`);
};

/**
 * 获取点赞列表
 * @param targetId 点赞目标
 * @param limit 条目数量
 */
export const getLikeList = async (targetId: string, limit: number) => {
  return axios.get(`/public/getLikeList?targetId=${targetId}&limit=${limit}`);
};

/**
 * 添加收藏
 * @param targetId 收藏目标Id
 */
export const addCollection = async (targetId: string) => {
  return axios.get(`/content/addCollection?targetId=${targetId}`);
};

/**
 * 获取关注我关注的列表
 * @param authorId 用户的账号
 * @param usernumber 当前用户的账号
 * @param skip 跳过的页数
 */
export const getFollowList = async (
  authorId: string,
  usernumber = "",
  skip = 0
) => {
  return axios.get(
    `/public/getFollowList?authorId=${authorId}&usernumber=${usernumber}&skip=${skip}`
  );
};

/**
 * 获取关注我的列表
 * @param targetId 用户的账号
 * @param usernumber 当前用户的账号
 * @param skip 跳过的页数
 */
export const getFollowedList = async (
  targetId: string,
  usernumber = "",
  skip = 0
) => {
  return axios.get(
    `/public/getFollowedList?targetId=${targetId}&usernumber=${usernumber}&skip=${skip}`
  );
};

/**
 * 获取收藏列表
 * @param usernumber 账号
 */
export const getCollectionList = async (usernumber: string) => {
  return axios.get(`/public/getCollectionList?usernumber=${usernumber}`);
};

/**
 * 获取草稿列表
 */
export const getDraftList = async () => {
  return axios.get("/content/getDraftList");
};

/**
 * 获取草稿详情
 * @param draftId 草稿Id
 */
export const getDraftDetail = async (draftId: string) => {
  return axios.get(`/content/getDraftDetail?draftId=${draftId}`);
};

/**
 * 删除草稿
 * @param draftId 草稿Id
 */
export const delDraft = async (draftId: string) => {
  return axios.get(`/content/delDraft?draftId=${draftId}`);
};

/**
 * 保存草稿
 * @param draftObj 草稿信息对象
 */
export const saveDraft = async (draftObj: any) => {
  return axios.post("/content/saveDraft", draftObj);
};

/**
 * 草稿是否存在
 * @param draftId 草稿Id
 */
export const existDraft = async (draftId: string) => {
  return axios.get(`/content/existDraft?draftId=${draftId}`);
};

/**
 * 添加文章
 * @param articleObj 文章信息对象
 */
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

/**
 * 删除文章
 * @param articleId 文章Id
 */
export const delArticle = async (articleId: string) => {
  return axios.get(`/content/delArticle?articleId=${articleId}`);
};

/**
 * 修改文章
 * @param articleObj 文章信息对象
 */
export const modifyArticle = async (articleObj: any) => {
  return axios.post("/content/modifyArticle", articleObj);
};

/**
 * 举报
 * @param reportObj 举报信息对象
 */
export const addReport = async (reportObj: any) => {
  return axios.post("/content/addReport", reportObj);
};

/**
 * 获取未读的点赞列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 */
export const getUnReadLikeList = async (skip = 0, limit = 20) => {
  return axios.get(`/content/getUnReadLikeList?skip=${skip}&limit=${limit}`);
};

/**
 * 获取未读的评论列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 */
export const getUnReadCommentList = async (skip = 0, limit = 20) => {
  return axios.get(`/content/getUnReadCommentList?skip=${skip}&limit=${limit}`);
};

/**
 * 获取未读的关注信息列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 */
export const getUnReadFollowList = async (skip = 0, limit = 20) => {
  return axios.get(`/content/getUnReadFollowList?skip=${skip}&limit=${limit}`);
};

/**
 * 获取指定数量的系统通知信息列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 */
export const getSystemMesList = async (skip = 0, limit = 20) => {
  return axios.get(`/content/getSystemMesList?skip=${skip}&limit=${limit}`);
};

/**
 * 设置消息已读状态
 * @param type 消息类型
 * @param id 消息ID
 * @param unRead 当前操作是否为取消已读（默认false）
 */
export const setIsRead = async (type: number, id: string, unRead = false) => {
  let url = `/content/setIsRead?type=${type}&id=${id}`;
  unRead && (url += `&unRead=${unRead}`);

  return axios.get(url);
};

/**
 * 查询用户的私信窗口列表
 * @param skip 跳过的页数
 * @param limit 一页的条目数
 */
export const getRoomList = async (skip = 0, limit = 20) => {
  return axios.get(`/content/getRoomList?skip=${skip}&limit=${limit}`);
};

/**
 * 获取私信内容
 * @param roomId 房间Id
 * @param skip 跳过的（条目数）
 * @param limit 一页的条目数
 */
export const getWhisperList = async (roomId: string, skip = 0, limit = 20) => {
  return axios.get(
    `/content/getWhisperList?roomId=${roomId}&skip=${skip}&limit=${limit}`
  );
};

/**
 * 发送私信
 * @param oppositeId 对方Id
 * @param roomId 房间Id
 * @param content 内容
 * @param type 内容类型
 */
export const addWhisper = async (
  oppositeId: string,
  roomId: string,
  content: string,
  type = 0
) => {
  return axios.post("/content/addWhisper", {
    oppositeId,
    roomId,
    content,
    type,
  });
};

/**
 * 开/关私信窗口
 * @param roomId 窗口Id
 * @param show 展示状态（1展示、0关闭）
 */
export const setRoomShow = async (roomId: string, show: number) => {
  return axios.get(`/content/setRoomShow?roomId=${roomId}&show=${show}`);
};

/**
 * 发起私信（创建窗口，有就打开）
 * @param oppositeId 对方Id
 */
export const addRoom = async (oppositeId: string) => {
  return axios.get(`/content/addRoom?oppositeId=${oppositeId}`);
};

/**
 * 置顶私信窗口
 * @param roomId 窗口Id
 * @param topping 置顶状态（1为置顶，0为未置顶）
 */
export const setRoomTop = async (roomId: string, topping: number) => {
  return axios.get(`/content/setRoomTop?roomId=${roomId}&topping=${topping}`);
};

/**
 * 撤回私信
 * @param whisperId 私信Id
 */
export const withdrawWhisper = async (whisperId: string) => {
  return axios.get(`/content/withdrawWhisper?whisperId=${whisperId}`);
};
