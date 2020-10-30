import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const Register = () => import(/* webpackChunkName: "Register" */ "@/views/Register.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Community = () => import(/* webpackChunkName: "Community" */ "@/views/Community.vue");
const Recommend = () => import(/* webpackChunkName: "Recommend" */ "@/views/Recommend.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Community",
        component: Community,
        children: [
          {
            path: "/",
            name: "Recommend",
            component: Recommend  
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
