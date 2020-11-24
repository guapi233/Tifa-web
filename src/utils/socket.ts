import config from "@/config";
import { io } from "socket.io-client";
import app from "@/main";
import { delStorage } from "@/utils/index";

let socket: any = {},
  vuex: any = {};

// 监听新的消息提醒（不包括私信）
const hasNewMes = (msgObj: any) => {
  console.log(msgObj);

  // 判断是单项推送，还是全部未读消息
  if (msgObj.type === "all") {
    for (const type in msgObj.data) {
      vuex.commit("setNewMes", {
        type,
        val: msgObj.data[type],
      });
    }
  } else {
    vuex.commit("setNewMes", {
      type: msgObj.type,
      val: msgObj.data,
    });
  }
};

// 鉴权结果
const auth = (result: any) => {
  const { isOk } = result;

  if (!isOk) {
    app.$router.push("/login");
    app.$Message.error("登陆过期，请重新登录");
    delStorage("token");
    return;
  }

  // 绑定事件
  socket.on("hasNewMes", hasNewMes);
};

// 入口函数
const initSocket = (store: any) => {
  socket = io(config.baseUrl);
  vuex = store;

  const state = store.state;

  socket.on("connect", () => {
    state.token && socket.emit("auth", "bearer " + state.token);
  });

  socket.on("auth", auth);
};

export default initSocket;
