<template>
  <div class="outermost">
    <div class="login-container">
      <Form ref="loginForm" :model="formData" :rules="validateRules">
        <FormItem prop="usernumber">
          <Input
            size="large"
            v-model="formData.usernumber"
            placeholder="手机号或邮箱"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            size="large"
            v-model="formData.password"
            placeholder="密码"
            type="password"
            password
          />
        </FormItem>

        <FormItem>
          <div class="flex">
            <Input size="large" placeholder="验证码" />
            <div class="captcha" v-html="captcha" @click="changeCaptcha"></div>
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary" long @click="login('loginForm')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { FormValidateHandle } from "@/utils/decorator";
import { getCaptcha } from "@/api/public";

@Component
export default class Login extends Vue {
  private captcha = "";
  private formData = {
    usernumber: "",
    password: ""
  };
  private validateRules = {
    usernumber: [
      { required: true, message: "请输入手机号或邮箱", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  private async created() {
    this.captcha = await getCaptcha();
  }

  // @FormValidateHandle("A")
  private login(formRef: string) {
    (this.$refs[formRef] as any).validate((valid: boolean) => {
      if (!valid) {
        console.log("校验出错");
      } else {
        console.log("success");
      }
    });
  }
  private async changeCaptcha() {
    this.captcha = await getCaptcha();
  }
}
</script>

<style lang="scss" scope>
.outermost {
  height: 100vh;
  overflow: hidden;
  background-color: $primaryColor;

  .login-container {
    width: 400px;
    height: 300px;
    background: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
    margin: 300px auto;
    padding: 25px;
  }

  .flex {
    display: flex;
    width: 100%;
  }

  .captcha {
    height: 40px;
    width: 150px;
    margin-left: 50px;
    cursor: pointer;
  }
}
</style>
