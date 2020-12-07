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
 * @param { HTMLObjectElement } scroller 滚动对象（默认为window）
 * @returns { Function } 返回函数(des 【目标值】)
 */
export const slidePage = (scrollTiming = 300, scroller: any = window) => {
  let timer = 0;

  return (des = 0) => {
    des = Number(des) || 0; // 防止直接传入模板中，des变成eventObj
    cancelAnimationFrame(timer);

    const b =
      scroller === window
        ? document.body.scrollTop || document.documentElement.scrollTop
        : scroller.scrollTop;
    const c = des - b;

    const startTime = Date.now();

    const func = () => {
      const t =
        scrollTiming - Math.max(0, startTime - Date.now() + scrollTiming);

      scroller.scrollTo(0, b + (c / scrollTiming) * t);

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
 * 小于3分钟：刚刚；小于一小时：xx分钟前；小于一天：xx小时前；小于两天：昨天 xx:xx；都不小于：月份-日期；不同年份：x年x月x日
 * @param date 日期时间戳
 */
export const dateFormat = (date: string | number) => {
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
  } else if (
    new Date(now).getDate() - new Date(date).getDate() === 1 &&
    difference <= yesterday
  ) {
    return `昨天 ${dateObj
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (
    difference > yesterday &&
    new Date(now).getFullYear() !== dateObj.getFullYear()
  ) {
    return `${dateObj.getFullYear()}年${dateObj.getMonth() +
      1}月${dateObj.getDate()}日`;
  } else {
    return `${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
  }
};

/**
 * 格式化图片
 * @param src 路径
 */
export const imgFormat = (src: string) => {
  if (!src || typeof src !== "string") return "";

  if (src.startsWith("http")) {
    return src;
  }
  return config.baseUrl + src;
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

/**
 * 防抖
 * @param fn 代加工函数
 * @param time 时间间隔
 * @param immediate 是否立即执行（默认false）
 * @param all 开始立即执行后是否还需要尾部执行（默认false）
 */
export const debounce = (
  fn: Function,
  time: number,
  immediate = false,
  all = false
) => {
  let timer: any = null;

  // 包裹函数
  const bundler = (...arg: any) => {
    // 是否开启立即执行
    if (immediate) {
      // 开启立即执行后为下文条目3的执行逻辑
      clearTimeout(timer);
      const flag = !timer;
      if (flag) fn(...arg);

      timer = setTimeout(() => {
        timer = null;
        // 如果想隔阂时间结束后同样执行方法，像这样在这里执行下方法即可
        all && fn(...arg);
      }, time);
    } else {
      // 不开启立即执行后为下文条目1的执行逻辑
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arg);
      }, time);
    }
  };

  // 取消本次时间隔阂
  bundler.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return bundler;
};

/**
 * 从冒泡序列中，查找身上携带 指定dataset 的DOM元素
 * @param arr DOM集合
 * @param key dataset's key
 */
export const selectEle = (arr: any[], key: string) => {
  let result = null;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].dataset && typeof arr[i].dataset[key] !== "undefined") {
      result = arr[i];
    }
  }

  return result;
};

/**
 * 鉴别一个元素是否处于视口（默认不判断顶部）
 * @param elm dom
 */
export const atViewport = (elm: any) => {
  const elmBottom =
    (elm.offsetTop || elm.parentNode.offsetTop) + elm.offsetHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const viewportBottom = scrollTop + document.documentElement.clientHeight;

  return elmBottom <= viewportBottom;
};

/**
 * 一个元素中是否含有另一个元素（不是父子）
 * @param wrap 外层
 * @param elm 内部元素
 */
export const hasElm = (wrap: any, elm: any) => {
  let result = false;

  while (elm.parentNode) {
    if (elm.parentNode === wrap) {
      result = true;
      break;
    }
    elm = elm.parentNode;
  }

  return result;
};

/**
 * 文本过滤HTML，清空所有HTML标签，但不消除内部内容
 * @param str 文本
 * @param replaced 要替换成的文本
 */
export const filteHTML = (str: string, replaced = "") => {
  const reg = /<[^>]*>|<\/[^>]*>/gm;
  str = str.replace("&nbsp;", " ");

  return str.replace(reg, replaced);
};

/**
 * 过滤文本中的Img标签
 * @param str 文本
 * @param replaced 要替换成的文本
 */
export const filteImg = (str: string, replaced = "") => {
  const reg = /<img(.*?)>/g;

  return str.replace(reg, replaced);
};

/**
 * 是否是一个有效的邮箱
 * @param str 字符串
 */
export const isEmail = (str: string) => {
  return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/.test(str);
};
