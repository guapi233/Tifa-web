import { v4 as uuidv4 } from "uuid";
import config from "@/config";

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
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (err) {
    return localStorage.getItem(key);
  }
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
 * 实现原理可参考：https://github.com/guapi233/Blog/issues/31
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

/**
 * 格式化点赞、观看、评论 数量展示
 * @param count 点赞、观看、评论 数量
 */
export const countFormat = (count: number) => {
  if (count > 999) {
    return `999+`;
  }

  return count;
};

/**
 * 格式化时间展示
 * 小于3分钟：刚刚；小于一小时：xx分钟前；小于一天：xx小时前；小于两天：昨天 xx:xx；都不小于：月份-日期
 * @param date 日期时间戳
 */
export const dateFormat = (date: number | string) => {
  if (typeof date === "string") {
    date = new Date(date).getTime();
  }

  const now = Date.now();
  const difference = now - date;
  const justNow = 1000 * 60 * 3;
  const oneHour = 1000 * 60 * 60 * 1;
  const today = 1000 * 60 * 60 * 24;
  const yesterday = 1000 * 60 * 60 * 48;
  const dateObj = new Date(date);

  if (difference <= justNow) {
    return "刚刚";
  } else if (difference > justNow && difference <= oneHour) {
    return `${Math.floor(difference / 1000 / 60)} 分钟前`;
  } else if (difference > oneHour && difference <= today) {
    return `${Math.floor(difference / 1000 / 60 / 60)} 小时前`;
  } else if (difference > today && difference <= yesterday) {
    return `昨天 ${dateObj
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
  }
};

/**
 * 是否为公共api
 * @param url 路径
 */
export const isPublicApi = (url: string) => {
  let isPublic = false;

  config.publicApi.forEach((exp) => {
    isPublic = isPublic || exp.test(url);
  });

  return isPublic;
};
