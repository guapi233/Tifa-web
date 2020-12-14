/**
 * 存放可以被复用的 校验器
 */
import axios from "@/utils/axios";
import { isEmail, isPhone } from "@/utils/index";

/**
 * 生成一个 用于判断与另一个输入框值是否相同的 validator，默认与密码框相匹配
 * @param form 表单对象
 * @param key 匹配目标的属性名
 * @param message 错误提示信息
 */
export const generDeterminInput = (
  form: any,
  key = "password",
  message = "两次输入的密码不相同"
) => {
  return (rule: any, value: any, callback: any) => {
    if (value !== form[key]) {
      callback(new Error(message));
    } else {
      callback();
    }
  };
};

/**
 * 生成一个 判断输入值是否已经存在的 validator，默认与usernumber框相匹配
 * @param form 表单对象
 * @param api 校验账号存在的api接口
 * @param key 匹配目标的属性名
 * @param message 错误提示信息
 */
export const generIsExistInput = (
  form: any,
  api: string,
  key = "usernumber",
  message = "该账号已被注册"
) => {
  return async (rule: any, value: any, calllback: any) => {
    const url = `${api}?${key}=${value}`;

    const res = await axios.get(url);

    // 如果结果为 false，表示当前账号没有被注册
    if (res) {
      calllback(new Error(message));
    } else {
      calllback();
    }
  };
};

/**
 * 生成一个 用于判断与一个值是否不相同的 validator
 * @param form 表单对象
 * @param val 目标值，输入框内的值不能与其相同
 * @param message 错误提示信息
 */
export const generUnDeterminInput = (
  form: any,
  val: string,
  message: string
) => {
  // 判断是表单数据还是固定数据
  const isFormData = Object.hasOwnProperty.call(form, val);

  return (rule: any, value: any, callback: any) => {
    const _val = isFormData ? form[val] : val;

    if (value === _val && value !== "") {
      callback(new Error(message));
    } else {
      callback();
    }
  };
};

/**
 * 生成一个 用于判断是一个手机或邮箱 validator
 * @param message 错误提示信息
 */
export const generPhoneOrEmailInput = (message: string) => {
  return (rule: any, value: any, callback: any) => {
    if (isPhone(value) || isEmail(value)) {
      callback();
    } else {
      callback(new Error(message));
    }
  };
};
