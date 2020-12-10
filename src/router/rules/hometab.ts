/**
 * Hometab 二级路由 下的 三级路由
 */

const Hometab = () =>
  import(/* webpackChunkName: "Hometab" */ "@/views/Home/Hometab.vue");
const Community = () =>
  import(/* webpackChunkName: "Community" */ "@/views/Home/Community.vue");
const Recommend = () =>
  import(/* webpackChunkName: "Recommend" */ "@/views/Home/Recommend.vue");
const Follow = () =>
  import(/* webpackChunkName: "Follow" */ "@/views/Home/Follow.vue");
const Topic = () =>
  import(/* webpackChunkName: "Topic" */ "@/views/Home/Topic.vue");

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
