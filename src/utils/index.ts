import { v4 as uuidv4 } from "uuid";

/**
 * 新建 Sid
 */
export const getSid = (): string => {
  return uuidv4();
};

/**
 * 读取 localStorage
 */
export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

/**
 * 写入 localStorage
 */

export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * 删除 localStorage
 */
export const delStorage = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * 返回页面顶部的初始化函数
 * 返回一个 用于返回页面顶部 的方法
 * @param { Number } scrollTiming 持续时长，默认300ms
 */

export const toPageTop = (scrollTiming = 300) => {
  let timer = 0;

  return () => {
    cancelAnimationFrame(timer);

    const b = document.body.scrollTop || document.documentElement.scrollTop;
    const c = b;

    const startTime = Date.now();

    const func = () => {
      const t =
        scrollTiming - Math.max(0, startTime - Date.now() + scrollTiming);

      window.scrollTo(0, b + (-c / scrollTiming) * t);

      timer = requestAnimationFrame(func);

      if (t === scrollTiming) {
        cancelAnimationFrame(timer);
      }
    };

    timer = requestAnimationFrame(func);
  };
};
