const devUrl = "http://localhost:3000";
const proUrl = "http://xxx.xxx.com";
const publicApi = [/^\/public/, /^\/login/];
const supportImgCategorys = ".jpg,.jpeg,.png,.gif";

export default {
  baseUrl: process.env.NODE_ENV === "development" ? devUrl : proUrl,
  publicApi,
  supportImgCategorys,
};
