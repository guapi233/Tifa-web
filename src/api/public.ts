import axios from "@/utils/axios";
import { getSid, setStorage, getStorage } from "@/utils/index";

let sid = getStorage("sid");

/**
 * 获取验证码
 */
export const getCaptcha = async () => {
  if (!sid) {
    sid = getSid();
    setStorage("sid", sid);
  }

  const result = await axios.get(`/public/getCaptcha?sid=${sid}`);

  if (result.status === 200) {
    return result.data;
  } else {
    throw new Error("生成验证码失败");
  } 
}