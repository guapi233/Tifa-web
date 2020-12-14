/**
 * 🛠 存放可以被复用装饰器
 * 遗留BUG：无法在Vue中使用自定义装饰器
 * 错误信息：Unable to resolve signature of method decorator when called as an expression.Vetur(1241)
 */

// 表单校验
export const FormValidateHandle = (formobj: any) => {
  return (next: Function) => {
    formobj.validate((valid: boolean) => {
      if (!valid) {
        console.log("校验出错");
      } else {
        console.log("success");
        next();
      }
    });
  };
};
