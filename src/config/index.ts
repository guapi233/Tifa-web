const devUrl = "http://localhost:3000";
const proUrl = "http://xxx.xxx.com";
const devUrlSelf = "http://localhost:8080";
const proUrlSelf = "htpp://xxx.xxx.com";
const publicApi = [/^\/public/, /^\/login/];
const supportImgCategorys = ".jpg,.jpeg,.png,.gif";

export default {
  baseUrl: process.env.NODE_ENV === "development" ? devUrl : proUrl,
  baseUrlSelf: process.env.NODE_ENV === "development" ? devUrlSelf : proUrlSelf,
  publicApi,
  supportImgCategorys,
};
