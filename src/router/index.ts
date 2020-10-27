import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
