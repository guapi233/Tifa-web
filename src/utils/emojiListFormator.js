const fs = require("fs");
const path = require("path");
const emojiPath = path.resolve(__dirname, "../assets/emoji.json");
const newEmojiPath = path.resolve(__dirname, "../assets/emoji.js");
const axios = require("axios");

// 1. 读取EMOJI列表
let data = fs.readFileSync(emojiPath, "utf-8");

// 2. 处理数据
console.log("🛠处理数据中...");
const newData = [];
const allWebP = [];
data = JSON.parse(data).packages;

data.forEach((olgCategory) => {
  // 2.1 创建新的EMOJI大类（过滤信息）
  let category = {
    id: olgCategory.id,
    text: olgCategory.text,
    url: olgCategory.url + "@88w_88h.webp",
  };
  allWebP.push(category.url);

  // 2.2 过滤EMOJI信息
  category.emote = olgCategory.emote.map((emoji) => {
    // 2.2.1 颜文字无需上传至服务器
    let url = emoji.type !== 4 ? emoji.url + "@88w_88h.webp" : emoji.url;
    if (emoji.type !== 4) {
      allWebP.push(url);
    }

    url = url.replace(
      "http://i0.hdslb.com/bfs/emote/",
      "http://localhost:3000/img/"
    );
    return {
      id: emoji.id,
      text: emoji.text,
      url,
    };
  });

  // 2.3 添加数据
  newData.push(category);
});

// 3. 将格式化的JS存储至assets/
console.log("💾正在向本地写入数据...");
fs.writeFileSync(newEmojiPath, "export default " + JSON.stringify(newData));

// 4. 上传图片至服务器
console.log("📡正在同步服务端的图片数据...");
console.time("⏱用时");
axios({
  method: "POST",
  url: "http://localhost:3000/public/getBiEmoji",
  data: {
    emojiList: allWebP,
  },
  timeout: 300000,
}).then((res) => {
  console.log("😁服务端图片数据同步完成：");
  console.timeEnd("⏱用时");
  console.log(JSON.stringify(res.data.data));
});
