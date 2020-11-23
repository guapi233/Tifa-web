import config from "@/config";
import { io } from "socket.io-client";
import app from "@/main";

// 鉴权结果
const auth = (result: any) => {
  const { isOk } = result;

  if (!isOk) {
    app.$router.push("/login");
    app.$Message.error("登陆过期，请重新登录");
  }
};

// 入口函数
const initSocket = (store: any) => {
  const socket = io(config.baseUrl);
  console.log(store);
  const state = store.state;

  socket.on("connect", () => {
    state.token && socket.emit("auth", "bearer " + state.token);
  });

  socket.on("auth", auth);
};

export default initSocket;
