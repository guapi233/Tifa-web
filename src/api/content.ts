import axios from "@/utils/axios";

export const getArticleList = async (skip = 0, limit = 0) => {
  const res = await axios.get(
    `/public/getArticleList?skip=${skip}&limit=${limit}`
  );

  if ((res as any).isOk) {
    return res.data;
  }
};
