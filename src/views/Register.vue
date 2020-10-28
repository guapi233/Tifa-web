<template>
  <div class="outermost">
    <div class="register-container">
      <Form ref="registerForm" :model="formData" :rules="validateRules">
        <FormItem prop="usernumber">
          <Input
            size="large"
            v-model="formData.usernumber"
            placeholder="账号"
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

        <FormItem prop="determinPassword">
          <Input
            size="large"
            v-model="formData.determinPassword"
            placeholder="确认密码"
            type="password"
            password
          />
        </FormItem>

        <FormItem prop="captcha">
          <div class="flex">
            <Input
              size="large"
              placeholder="验证码"
              v-model="formData.captcha"
            />
            <Tooltip content="看不清楚？换一张" placement="right">
              <div
                class="captcha"
                v-html="captcha"
                @click="changeCaptcha"
              ></div>
            </Tooltip>
          </div>
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            long
            @click="register('registerForm')"
            :loading="btnLoading"
          >
            <span v-if="!btnLoading">注册</span>
            <span v-else>注册中...</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { FormValidateHandle } from "@/utils/decorator";
import { getCaptcha } from "@/api/public";
import { register } from "@/api/login";
import { getStorage, setStorage } from "@/utils/index";
import { generDeterminInput } from "@/utils/validator";

@Component
export default class Register extends Vue {
  private btnLoading = false;
  private captcha = "";
  private formData = {
    usernumber: "",
    password: "",
    determinPassword: "",
    captcha: ""
  };
  private validateRules = {
    usernumber: [
      { required: true, message: "请输入账号", trigger: "blur" },
      { min: 6, max: 20, message: "合法的账号长度为6-20位", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "合法的密码长度为6-20位", trigger: "blur" }
    ],
    determinPassword: [
      { required: true, message: "请再次输入密码", trigger: "blur" },
      {
        validator: generDeterminInput(this.formData),
        trigger: "blur"
      }
    ],
    captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
  };

  private async created() {
    this.captcha = await getCaptcha();
  }

  // @FormValidateHandle("A")
  private register(formRef: string) {
    (this.$refs[formRef] as any).validate(async (valid: boolean) => {
      if (valid) {
        this.btnLoading = true;
        // 执行 登录
        const res = await register({
          ...this.formData,
          sid: getStorage("sid")
        });

        this.btnLoading = false;
        if (res) {
          setStorage("userInfo", JSON.stringify(res.data));
          setStorage("token", (res as any).token);
          this.$router.replace("/");
        } else {
          // 登陆失败后重置验证码
          await this.changeCaptcha();
        }
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

  .register-container {
    width: 400px;
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
