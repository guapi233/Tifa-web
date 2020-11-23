/**
 * Message 二级下的  三级路由
 */

const Message = () =>
  import(/* webpackChunkName: "Message" */ "@/views/Message.vue");
const MessageReply = () =>
  import(/* webpackChunkName: "MessageReply" */ "@/views/Message/Reply.vue");
const MessageAt = () =>
  import(/* webpackChunkName: "MessageAt" */ "@/views/Message/At.vue");
const MessageLike = () =>
  import(/* webpackChunkName: "MessageLike" */ "@/views/Message/Like.vue");
const MessageSystem = () =>
  import(/* webpackChunkName: "MessageSystem" */ "@/views/Message/System.vue");
const MessageWhisper = () =>
  import(
    /* webpackChunkName: "MessageWhisper" */ "@/views/Message/Whisper.vue"
  );

export default {
  path: "/message",
  component: Message,
  redirect: "/message/reply",
  children: [
    {
      path: "reply",
      name: "MessageReply",
      component: MessageReply,
    },
    {
      path: "at",
      name: "MessageAt",
      component: MessageAt,
    },
    {
      path: "like",
      name: "MessageLike",
      component: MessageLike,
    },
    {
      path: "system",
      name: "MessageSystem",
      component: MessageSystem,
    },
    {
      path: "whisper/:wid",
      name: "MessageWhisper",
      component: MessageWhisper,
    },
  ],
};
