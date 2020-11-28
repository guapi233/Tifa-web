/**
 * 存放自定义指令集
 */
import Hljs from "highlight.js";
import { selectEle } from "@/utils/index";

/**
 * 语法高亮
 */
export const highlight = (el: any) => {
  const blocks = el.querySelectorAll("pre code");

  blocks.forEach((block: any) => {
    Hljs.highlightBlock(block);
  });
};

/**
 * 右键创建上下文菜单
 */
let contextMenuBox: any = null,
  contextMenuEl;
// 创建contextmenu
const createContextMenu = (expression: any, left: string, top: string) => {
  // 1. create contextmenu
  const contextMenuBox = document.createElement("div");
  contextMenuBox.style.cssText = `
      position: fixed;
      min-width: 120px;
      z-index: 120;
      background: #eeeff1;
      color: #6c6c6c;
      border-radius: 6px;
      box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
      font-size: 13px;
      line-height: 1.5;
      left: ${left}px;
      top: ${top}px;
    `;
  contextMenuBox.addEventListener("click", (e) => e.stopPropagation());
  contextMenuBox.addEventListener("contextmenu", (e) => e.stopPropagation());
  const contextMenuUlBox = document.createElement("ul");
  contextMenuUlBox.style.cssText = `
      margin: 0;
      padding: 0;
      list-style: none;
      border-radius: 6px;
      overflow: hidden;
    `;

  // 2. create and make item of contextmenu
  Object.keys(expression).forEach((key: any) => {
    const contextMenuLiBox = document.createElement("li");
    contextMenuLiBox.style.cssText = `
        padding: 6px 12px 3px 12px;
        cursor: pointer;
      `;
    contextMenuLiBox.innerHTML = key;

    contextMenuUlBox.appendChild(contextMenuLiBox);
  });

  contextMenuBox.appendChild(contextMenuUlBox);
  return contextMenuBox;
};
// 移除contextMenuBox
const removeContextMenuBox = () => {
  contextMenuBox && contextMenuEl.removeChild(contextMenuBox);
  contextMenuBox = null;
};
// Bind
const contextmenuBind = (el: any, payload: any) => {
  const { value } = payload;
  contextMenuEl = el;

  el.addEventListener("contextmenu", (e: any) => {
    if (!selectEle(e.path, "contextmenu")) return;

    contextMenuBox && el.removeChild(contextMenuBox);
    contextMenuBox = createContextMenu(value, e.clientX, e.clientY);
    el.appendChild(contextMenuBox);

    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener("click", removeContextMenuBox);
  document.addEventListener("contextmenu", removeContextMenuBox);
};
// UnBind
const contextmenuUnBind = (el: any) => {
  document.removeEventListener("click", removeContextMenuBox);
  document.removeEventListener("contextmenu", removeContextMenuBox);
};

export const contextmenu = {
  bind: contextmenuBind,
  unbind: contextmenuUnBind,
};
