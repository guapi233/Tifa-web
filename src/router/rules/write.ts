/**
 * Write 一级路由下的 二级路由
 */

const Edit = () =>
  import(/* webpackChunkName: "Edit" */ "@/views/Write/Edit.vue");

export default [
  {
    path: "/",
    name: "Edit",
    component: Edit,
  },
];
