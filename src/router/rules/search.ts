/**
 * Search 二级下的  三级路由
 */

const Search = () =>
  import(/* webpackChunkName: "Search" */ "@/views/Search.vue");
const SearchArticle = () =>
  import(/* webpackChunkName: "Search" */ "@/views/Search/Article.vue");
const SearchUser = () =>
  import(/* webpackChunkName: "Search" */ "@/views/Search/User.vue");

export default {
  path: "/search",
  name: "Search",
  component: Search,
  redirect: "/search/article",
  children: [
    {
      path: "article",
      name: "SearchArticle",
      component: SearchArticle,
    },
    {
      path: "user",
      name: "SearchUser",
      component: SearchUser,
    },
  ],
};
