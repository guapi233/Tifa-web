/**
 * 路由配置文件入口
 */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import homeRoutes from "./rules/home";
import otherRoutes from "./rules/other";

const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
    children: homeRoutes,
  },
  ...otherRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
