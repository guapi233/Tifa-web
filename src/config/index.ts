const devUrl = "http://localhost:3000";
const proUrl = "http://42.193.108.7:3000";
const devUrlSelf = "http://localhost:8080";
const proUrlSelf = "http://42.193.108.7:88";
const publicApi = [/^\/public/, /^\/login/];
const supportImgCategorys = ".jpg,.jpeg,.png,.gif";

export default {
  baseUrl: process.env.NODE_ENV === "development" ? devUrl : proUrl,
  baseUrlSelf: process.env.NODE_ENV === "development" ? devUrlSelf : proUrlSelf,
  publicApi,
  supportImgCategorys,
};
