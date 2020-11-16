/**
 * 存放自定义指令集
 */
import Hljs from "highlight.js";

export const highlight = (el: any) => {
  const blocks = el.querySelectorAll("pre code");

  blocks.forEach((block: any) => {
    Hljs.highlightBlock(block);
  });
};
