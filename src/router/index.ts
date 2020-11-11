/**
 * 路由配置文件入口
 */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import homeRoutes from "./rules/home";
import writeRoutes from "./rules/write";
import otherRoutes from "./rules/other";
import store from "@/store";

const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Write = () => import(/* webpackChunkName: "Write" */ "@/views/Write.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
    children: homeRoutes,
  },
  {
    path: "/write",
    component: Write,
    children: writeRoutes,
  },
  ...otherRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 鉴权路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!store.state.token) {
      next("/login");
    }
  }
  next();
});

export default router;
