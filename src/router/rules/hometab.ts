/**
 * Hometab 二级路由 下的 三级路由
 */

const Hometab = () =>
  import(/* webpackChunkName: "Hometab" */ "@/views/Hometab.vue");
const Community = () =>
  import(/* webpackChunkName: "Community" */ "@/views/Community.vue");
const Recommend = () =>
  import(/* webpackChunkName: "Recommend" */ "@/views/Recommend.vue");
const Follow = () =>
  import(/* webpackChunkName: "Follow" */ "@/views/Follow.vue");
const Topic = () => import(/* webpackChunkName: "Topic" */ "@/views/Topic.vue");

export default {
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
};
