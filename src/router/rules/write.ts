/**
 * Write 一级路由下的 二级路由
 */

const Edit = () =>
  import(/* webpackChunkName: "Edit" */ "@/views/Write/Edit.vue");
const Draft = () =>
  import(/* webpackChunkName: "Draft" */ "@/views/Write/Draft.vue");

export default [
  {
    path: "/",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/draft",
    name: "Draft",
    component: Draft,
  },
  {
    path: "/draft/:draftId",
    name: "DraftItem",
    component: Edit,
  },
];
