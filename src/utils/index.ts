import { v4 as uuidv4 } from "uuid";

/**
 * 新建 Sid
 */
export const getSid = (): string => {
  return uuidv4();
}

/**
 * 读取 localStorage
 */
export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key);
}

/**
 * 写入 localStorage  
 */ 
export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

/**
 * 删除 localStorage
 */
export const delStorage = (key: string) => {
  localStorage.removeItem(key);
}