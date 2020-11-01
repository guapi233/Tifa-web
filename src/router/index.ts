import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "@/views/Register.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Hometab = () =>
  import(/* webpackChunkName: "Hometab" */ "@/views/Hometab.vue");
const Community = () =>
  import(/* webpackChunkName: "Community" */ "@/views/Community.vue");
const Recommend = () =>
  import(/* webpackChunkName: "Recommend" */ "@/views/Recommend.vue");
const Follow = () =>
  import(/* webpackChunkName: "Follow" */ "@/views/Follow.vue");
const Topic = () => import(/* webpackChunkName: "Topic" */ "@/views/Topic.vue");
const User = () => import(/* webpackChunkName: "User" */ "@/views/User.vue");
const UserUpdate = () =>
  import(/* webpackChunkName: "Update" */ "@/views/User/Update.vue");
const UserArticle = () =>
  import(/* webpackChunkName: "UserArticles" */ "@/views/User/Article.vue");
const UserTopic = () =>
  import(/* webpackChunkName: "UserTopic" */ "@/views/User/Topic.vue");
const UserCollection = () =>
  import(
    /* webpackChunkName: "UserCollection" */ "@/views/User/Collection.vue"
  );
const UserFollow = () =>
  import(/* webpackChunkName: "UserFollow" */ "@/views/User/Follow.vue");
const NotFound = () =>
  import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        name: "Hometab",
        component: Hometab,
        redirect: "/community",
        children: [
          {
            path: "community",
            component: Community,
            children: [
              {
                path: "",
                name: "CommunityRecommend",
                component: Recommend,
              },
              {
                path: "follow",
                name: "Follow",
                component: Follow,
              },
            ],
          },
          {
            path: "/topic",
            name: "Topic",
            component: Topic,
          },
        ],
      },
      {
        path: "/user/:usernumber",
        component: User,
        children: [
          {
            path: "",
            name: "UserUpdate",
            component: UserUpdate,
          },
          {
            path: "article",
            name: "UserArticle",
            component: UserArticle,
          },
          {
            path: "topic",
            name: "UserTopic",
            component: UserTopic,
          },
          {
            path: "collection",
            name: "UserCollection",
            component: UserCollection,
          },
          {
            path: "follow",
            name: "UserFollow",
            component: UserFollow,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
