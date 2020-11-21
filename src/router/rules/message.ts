/**
 * Message 二级下的  三级路由
 */

const Message = () =>
  import(/* webpackChunkName: "Message" */ "@/views/Message.vue");

export default {
  path: "/message",
  name: "Message",
  component: Message,
};
