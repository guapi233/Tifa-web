<template>
  <div class="setting-account-outermost">
    <Form :model="formData" class="setting-form-reset" :rules="ruleValidates">
      <!-- 认证手机号 -->
      <div class="item-box">
        <FormItem prop="mobile" label="认证手机号">
          <i-input
            class="setting-input-reset"
            size="large"
            v-model="formData.mobile"
            :disabled="!mobileBtn[1]"
            :placeholder="mobileBtn[2]"
          >
            <Button slot="suffix" shape="circle" @click="mobileBtnClick">{{
              mobileBtn[0]
            }}</Button>
          </i-input>
        </FormItem>
      </div>
      <!-- 邮箱绑定 -->
      <div class="item-box">
        <FormItem prop="email" label="邮箱绑定">
          <i-input
            class="setting-input-reset"
            size="large"
            v-model="formData.email"
            :placeholder="emailBtn[2]"
            :disabled="!emailBtn[1]"
          >
            <CountDownButton
              :countDown.sync="emailBtn[3]"
              slot="suffix"
              shape="circle"
              @click="emailBtnClick"
              >{{ emailBtn[0] }}</CountDownButton
            >
          </i-input>
        </FormItem>
      </div>
      <!-- 个性域名 -->
      <div class="item-box">
        <FormItem prop="territory" label="个性域名（创建设置后不可修改）">
          <div class="flex">
            <span class="prefix">{{ baseUrl }}/user/</span>
            <i-input
              class="setting-input-reset"
              size="large"
              v-model="formData.mobile"
              :placeholder="territoryBtn[2]"
              :disabled="!territoryBtn[1]"
            >
              <Button slot="suffix" shape="circle" @click="territoryBtnClick">{{
                territoryBtn[0]
              }}</Button>
            </i-input>
          </div>
        </FormItem>
        <FormItem label="社交账号绑定" class="binding">
          <div class="binding-box">
            <Button shape="circle" type="primary">关联微信</Button>
            <Button shape="circle" type="error">关联微博</Button>
          </div>
        </FormItem>
      </div>
      <!-- 修改登录密码 -->
      <div class="item-box">
        <FormItem prop="password" label="修改登录密码" class="affix-wrap">
          <Input
            class="setting-input-reset"
            size="large"
            v-model="formData.password"
            :placeholder="passwordBtn[2]"
            v-if="passwordBtn[1]"
          />
          <div class="affix">
            <Button shape="circle" @click="passwordBtnClick">{{
              passwordBtn[0]
            }}</Button>
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { sendMail } from "@/api/public";
import { isEmail } from "@/utils/index";
import { generUnDeterminInput } from "@/utils/validator";
import CountDownButton from "@/components/CountDownButton";
import config from "@/config";

@Component({
  components: { CountDownButton },
})
export default class SettingAccount extends Vue {
  private baseUrl = config.baseUrl;
  private userInfo = this.$store.state.userInfo;
  private formData = {
    mobile: "",
    email: "",
    password: "",
  };
  private ruleValidates = {
    email: [
      {
        type: "email",
        message: "邮箱格式错误",
        trigger: "change",
      },
      {
        validator: generUnDeterminInput(
          this.formData,
          this.userInfo.email,
          "这已经是当前的邮箱了"
        ),
        trigger: "change",
      },
    ],
  };
  // 控制按钮
  private mobileBtn = ["修改", false, `+86 ${this.userInfo.mobile}（已认证）`];
  // 按钮文本、是否打开了输入、输入框信息、倒计时时长
  private emailBtn = ["绑定", false, "未绑定", 0];
  private territoryBtn = ["创建", false, this.userInfo.usernumber];
  private passwordBtn = ["修改", false];

  private created() {
    this.initBtns();
  }

  // 初始化控制按钮
  private initBtns() {
    // 邮箱绑定
    if (this.userInfo.email) {
      this.emailBtn = ["编辑", false, this.userInfo.email + "（已绑定）", 0];
    }
  }

  // 控制按钮事件
  private mobileBtnClick() {
    if (!this.mobileBtn[1]) {
      this.$set(this.mobileBtn, 0, "确定");
      this.$set(this.mobileBtn, 1, true);
    } else {
      console.log("??");
    }
  }
  private async emailBtnClick() {
    if (!this.emailBtn[1]) {
      this.$set(this.emailBtn, 0, "发送验证邮件");
      this.$set(this.emailBtn, 1, true);
      this.$set(this.emailBtn, 2, "请输入绑定邮箱");
    } else {
      if (
        !isEmail(this.formData.email) ||
        this.formData.email === this.userInfo.email
      )
        return;

      // 倒计时
      this.$set(this.emailBtn, 3, 60);

      const res = await sendMail({
        type: "0",
        email: this.formData.email,
      });

      console.log(res);
    }
  }
  private territoryBtnClick() {
    if (!this.territoryBtn[1]) {
      this.$set(this.territoryBtn, 0, "确定");
      this.$set(this.territoryBtn, 1, true);
      this.$set(this.territoryBtn, 2, "请输入个性域名");
    } else {
      console.log("??");
    }
  }
  private passwordBtnClick() {
    if (!this.passwordBtn[1]) {
      this.$set(this.passwordBtn, 0, "确定");
      this.$set(this.passwordBtn, 1, true);
      this.$set(this.passwordBtn, 2, "请输入原密码");
    } else {
      console.log("??");
    }
  }

  // 用户信息监听变化，重新初始化状态
  @Watch("$store.state.userInfo")
  private onUserInfoChange(newVal: object) {
    console.log(newVal);
    this.userInfo = newVal;
    this.initBtns();
  }
}
</script>

<style lang="scss">
.setting-account-outermost {
  .item-box {
    padding: 24px 20px;
    background: #fff;
    text-align: center;
    margin-bottom: 12px;

    .binding {
      margin-top: 20px;
      .binding-box {
        width: 100%;
        display: flex;

        button {
          margin-right: 30px;
        }
      }
    }

    .affix-wrap {
      position: relative;

      .affix {
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 15px;
      }
    }
  }

  .setting-form-reset {
    .setting-input-reset {
      input {
        font-size: 16px;
      }
    }

    .ivu-form-item {
      margin-bottom: 0;
    }

    .ivu-input-suffix {
      text-align: right;
      width: 120px;
      right: 15px;
      top: 15px;
    }
  }

  .flex {
    display: flex;
    width: 100%;
    align-items: center;

    .prefix {
      margin-right: 10px;
      color: $contentColor;
    }
  }
}
</style>
