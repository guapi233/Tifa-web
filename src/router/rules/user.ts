/**
 * User 二级路由下的 三级路由
 */

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

export default {
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
};
