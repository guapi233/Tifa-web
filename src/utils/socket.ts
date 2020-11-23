import config from "@/config";
import { io } from "socket.io-client";

const socket = io(config.baseUrl);

socket.on("connect", () => {
  console.log("???");
});

export default socket;
