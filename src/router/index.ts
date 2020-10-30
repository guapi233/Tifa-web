import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const Register = () => import(/* webpackChunkName: "Register" */ "@/views/Register.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Community = () => import(/* webpackChunkName: "Community" */ "@/views/Community.vue");
const Recommend = () => import(/* webpackChunkName: "Recommend" */ "@/views/Recommend.vue");
const Follow = () => import(/* webpackChunkName: "Follow" */ "@/views/Follow.vue");
const Topic = () => import(/* webpackChunkName: "Topic" */ "@/views/Topic.vue");

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
          },
          {
            path: "/follow",
            name: "Follow",
            component: Follow
          }
        ]
      },
      {
        path: "/topic",
        name: "Topic",
        component: Topic
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
