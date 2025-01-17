/**
 * 路由配置文件入口
 */

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import homeRoutes from "./rules/home";
import writeRoutes from "./rules/write";
import otherRoutes from "./rules/other";
import store from "@/store";
import jwt from "jsonwebtoken";
import app from "@/main";

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
    meta: { requireAuth: true },
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
    } else {
      // 验证 token 是否过期
      const { exp } = jwt.decode(store.state.token);

      if (Date.now() > exp * 1000) {
        next("/login");
        app.$Message.error("登录已失效，请重新登录");
      }
    }
  }
  next();
});

export default router;
