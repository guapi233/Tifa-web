<template>
  <div class="forget-outermost">
    <div class="back-home">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="返回首页" />
      </router-link>
    </div>
    <div class="forget-container">
      <Form
        ref="forgetForm0"
        :model="formData0"
        :rules="validateRules0"
        v-show="step === 0"
      >
        <FormItem prop="usernumber">
          <Input
            size="large"
            v-model="formData0.usernumber"
            placeholder="账号"
          />
        </FormItem>
        <!-- <FormItem prop="password">
          <Input
            size="large"
            v-model="formData.password"
            placeholder="密码"
            type="password"
            password
          />
        </FormItem> -->

        <FormItem prop="captcha">
          <div class="flex">
            <Input
              size="large"
              placeholder="验证码"
              v-model="formData0.captcha"
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
          <div class="forget-btn-wrap">
            <Button type="primary" @click="sendMail">
              <span>通过邮箱找回</span>
            </Button>

            <Button type="primary" @click="sendMsg">
              <span>通过手机号找回</span>
            </Button>
          </div>
        </FormItem>

        <!-- <FormItem>
          <Button
            type="primary"
            long
            @click="forget('forgetForm')"
            :loading="btnLoading"
          >
            <span v-if="!btnLoading">重置密码</span>
            <span v-else>重置中...</span>
          </Button>
        </FormItem> -->
      </Form>
      <Form
        ref="forgetForm1"
        :model="formData1"
        :rules="validateRules1"
        v-show="step === 1"
      >
        <FormItem prop="verifyCode">
          <Input
            size="large"
            v-model="formData1.verifyCode"
            placeholder="请输入收到的验证码"
          />
        </FormItem>

        <FormItem prop="password">
          <Input
            size="large"
            v-model="formData1.password"
            placeholder="密码"
            type="password"
            password
          />
        </FormItem>

        <FormItem prop="determinPassword">
          <Input
            size="large"
            v-model="formData1.determinPassword"
            placeholder="确认密码"
            type="password"
            password
          />
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            long
            @click="setPassword()"
            :loading="btnLoading"
          >
            <span v-if="!btnLoading">重置密码</span>
            <span v-else>重置中...</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { getCaptcha, sendMail } from "@/api/public";
import { setPassword } from "@/api/user";
import { getStorage, setStorage, getSid } from "@/utils/index";
import { generDeterminInput } from "@/utils/validator";
// import { generPhoneOrEmailInput } from "@/utils/validator";

@Component
export default class Forget extends Vue {
  @Ref("forgetForm0") private forgetFrom0!: any;
  @Ref("forgetForm1") private forgetFrom1!: any;
  private step = 0;
  private sid = getSid();
  private btnLoading = false;
  private captcha: any = "";
  // 阶段0数据
  private formData0 = {
    usernumber: "",
    password: "",
    captcha: "",
  };
  private validateRules0 = {
    usernumber: [
      { required: true, message: "请输入账号", trigger: "blur" },
      // {
      // validator: generPhoneOrEmailInput("请输入正确的手机号或邮箱"),
      //   trigger: "blur",
      // },
    ],
    // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  };
  // 阶段1数据
  private formData1 = {
    verifyCode: "",
    password: "",
    determinPassword: "",
  };
  private validateRules1 = {
    verifyCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "合法的密码长度为6-20位", trigger: "blur" },
    ],
    determinPassword: [
      { required: true, message: "请再次输入密码", trigger: "blur" },
      {
        validator: generDeterminInput(this.formData1),
        trigger: "blur",
      },
    ],
  };

  private async created() {
    this.captcha = await getCaptcha();
  }

  // 下一步
  private sendMail() {
    this.forgetFrom0.validate(async (validated: boolean) => {
      if (!validated) return;

      const res: any = await sendMail({
        type: 1,
        sid: this.sid,
        usernumber: this.formData0.usernumber,
      });

      if (!res) return;

      this.$Message.success(res);
      this.step = 1;
    });
  }
  private sendMsg() {
    this.forgetFrom0.validate((validated: boolean) => {
      if (!validated) return;
      this.$Message.info("手机找回功能正在开发中...");
    });
  }

  // 重置密码
  private setPassword() {
    this.forgetFrom1.validate(async (validated: boolean) => {
      if (!validated) return;

      const res = await setPassword({
        verifyCode: this.formData1.verifyCode,
        sid: this.sid,
        usernumber: this.formData0.usernumber,
        newPassword: this.formData1.password,
      });

      if (!res) return;

      this.$Message.success("修改密码成功");
      this.$router.replace("/login");
    });
  }

  private async changeCaptcha() {
    this.captcha = await getCaptcha();
  }
}
</script>

<style lang="scss">
.forget-outermost {
  height: 100vh;
  overflow: hidden;
  background-color: $primaryColor;

  .back-home {
    width: 100px;
    cursor: pointer;
    margin: 150px auto 0;

    img {
      width: 100%;
    }
  }

  .forget-container {
    width: 400px;
    background: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
    margin: 100px auto;
    padding: 25px;
  }

  .forget-btn-wrap {
    display: flex;
    justify-content: space-between;
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

  .tools-bar {
    display: flex;
    justify-content: space-between;
  }
}
</style>
