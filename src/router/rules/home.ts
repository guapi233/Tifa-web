/**
 * Home 一级路由 下的 二级路由
 */

const ArticleDetail = () =>
  import(/* webpackChunkName: "ArticleDetail" */ "@/views/ArticleDetail.vue");

import userRoutes from "./user";
import settingRoutes from "./setting";
import hometabRoutes from "./hometab";

export default [
  hometabRoutes,
  userRoutes,
  settingRoutes,
  {
    path: "/article/:articleId",
    name: "Article",
    component: ArticleDetail,
  },
];
