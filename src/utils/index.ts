import { v4 as uuidv4 } from "uuid";
import { getCaptcha } from "@/api/public";

/**
 * 新建 Sid
 */
export const getSid = (): string => {
  return uuidv4();
}

/**
 * 新建验证码
 */
export const newCaptcha = async () => {
  const result = await getCaptcha();

  if (result.status === 200) {
    return result.data;
  } else {
    throw new Error("生成验证码失败");
  } 
}
