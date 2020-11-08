/**
 * 对请求错误进行统一处理
 * @param errorMsg 错误信息
 */
import app from "@/main";

const errorHanlde = (errorMsg: any) => {
  console.log(errorMsg);

  const { status } = errorMsg.response;
  // 登录失效
  if (status === 401) {
    app.$Message.error("登录失效，请重新进行登录");
    app.$router.replace("/login");
  }
};

export default errorHanlde;
