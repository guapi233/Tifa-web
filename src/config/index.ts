const devUrl = "http://localhost:3000";
const proUrl = "http://xxx.xxx.com";

export default {
  baseUrl: process.env.NODE_ENV === "development" ? devUrl : proUrl,
};
