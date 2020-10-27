import axios from "@/utils/axios";
import { getSid } from "@/utils/index";

let sid = "";

/**
 * 获取验证码
 */
export const getCaptcha = () => {
  !sid && (sid = getSid());
  return axios.get(`/public/getCaptcha?sid=${sid}`);
}