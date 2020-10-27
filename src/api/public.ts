import axios from "@/utils/axios";
import { getSid } from "@/utils/index";

let sid = "";

/**
 * 获取验证码
 */
export const getCaptcha = async () => {
  !sid && (sid = getSid());
  const result = await axios.get(`/public/getCaptcha?sid=${sid}`);

  if (result.status === 200) {
    return result.data;
  } else {
    throw new Error("生成验证码失败");
  } 
}