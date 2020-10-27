import { v4 as uuidv4 } from "uuid";
import { getCaptcha } from "@/api/public";

/**
 * 新建 Sid
 */
export const getSid = (): string => {
  return uuidv4();
}
