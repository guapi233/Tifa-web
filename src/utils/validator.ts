/**
 * 存放可以被复用的 校验器
 */

 /**
  * 生成一个 用于判断与另一个输入框值是否相同的 validator，默认与密码框相匹配
  * @param form 表单对象
  * @param key 匹配目标的属性名
  * @param message 错误提示信息
  */
export const generDeterminInput = (form: any, key="password", message="两次输入的密码不相同") => {
  return (rule: any, value: any, callback: any) => {
    if (value !== form[key]) {
      callback(new Error(message));
    } else {
      callback();
    }
  };
};