/**
 * Home 一级路由 下的 二级路由
 */

const ArticleDetail = () =>
  import(/* webpackChunkName: "ArticleDetail" */ "@/views/ArticleDetail.vue");

import userRoutes from "./user";
import settingRoutes from "./setting";
import hometabRoutes from "./hometab";
import messageRoutes from "./message";
import searchRoutes from "./search";

export default [
  hometabRoutes,
  userRoutes,
  settingRoutes,
  messageRoutes,
  searchRoutes,
  {
    path: "/article/:articleId",
    name: "Article",
    component: ArticleDetail,
  },
];
