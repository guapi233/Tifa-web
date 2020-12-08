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
        <FormItem prop="alias" :label="`个性域名（${aliasBtn[4]}）`">
          <div class="flex">
            <span class="prefix">{{ baseUrlSelf }}/user/</span>
            <i-input
              class="setting-input-reset"
              size="large"
              v-model="formData.alias"
              :placeholder="aliasBtn[2]"
              :disabled="!aliasBtn[1]"
            >
              <Button
                slot="suffix"
                shape="circle"
                @click="aliasBtnClick"
                v-if="aliasBtn[3]"
                >{{ aliasBtn[0] }}</Button
              >
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
        <div class="affix">
          <span>修改登录密码</span>
          <Button shape="circle" @click="passwordBtnClick">{{
            passwordBtn[0]
          }}</Button>
        </div>
        <div class="password-wrap" v-if="passwordBtn[1]">
          <FormItem prop="oldPassword" class="mt10 mb30">
            <Input
              class="setting-input-reset"
              type="password"
              size="large"
              v-model="formData.oldPassword"
              placeholder="请输入原密码"
            />
          </FormItem>
          <FormItem prop="newPassword" class="mt10 mb10">
            <Input
              class="setting-input-reset"
              type="password"
              size="large"
              v-model="formData.newPassword"
              placeholder="请输入新密码"
            />
          </FormItem>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { sendMail } from "@/api/public";
import { setPassword, setAlias } from "@/api/user";
import { isEmail, isMiddle } from "@/utils/index";
import { generUnDeterminInput } from "@/utils/validator";
import CountDownButton from "@/components/CountDownButton";
import config from "@/config";

@Component({
  components: { CountDownButton },
})
export default class SettingAccount extends Vue {
  private baseUrlSelf = config.baseUrlSelf;
  private userInfo = this.$store.state.userInfo;
  private formData = {
    alias: "",
    email: "",
    oldPassword: "",
    newPassword: "",
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
    alias: [
      {
        min: 3,
        max: 12,
        message: "合法的个性域名长度为3-12位",
        trigger: "blur",
      },
    ],
    oldPassword: [
      { required: true, message: "请输入原密码", trigger: "blur" },
      { min: 6, max: 20, message: "合法的密码长度为6-20位", trigger: "blur" },
    ],
    newPassword: [
      { required: true, message: "请输入新密码", trigger: "blur" },
      { min: 6, max: 20, message: "合法的密码长度为6-20位", trigger: "blur" },
      {
        validator: generUnDeterminInput(
          this.formData,
          "oldPassword",
          "新密码不能和旧密码相同"
        ),
        trigger: "blur",
      },
    ],
  };
  // 控制按钮
  private mobileBtn = ["修改", false, `+86 ${this.userInfo.mobile}（已认证）`];
  // 按钮文本、是否打开了输入、输入框信息、倒计时时长
  private emailBtn = ["绑定", false, "未绑定", 0];
  // 按钮信息、是否打开输入、输入框信息、是否允许打开输入、绑定提示信息
  private aliasBtn = [
    "创建",
    false,
    this.userInfo.usernumber,
    true,
    "创建设置后不可修改",
  ];
  private passwordBtn = ["修改", false];

  private created() {
    this.initBtns();
  }

  // 初始化控制按钮
  private initBtns() {
    // 邮箱绑定
    if (this.userInfo.email) {
      this.formData.email = "";
      this.emailBtn = ["编辑", false, this.userInfo.email + "（已绑定）", 0];
    }

    // alias 绑定
    if (this.userInfo.alias) {
      this.formData.alias = "";
      this.aliasBtn = ["创建", false, this.userInfo.alias, false, "已绑定"];
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

      if (!res) return;
      this.$Message.success("邮件已发送");
    }
  }
  private async aliasBtnClick() {
    if (!this.aliasBtn[1]) {
      this.$set(this.aliasBtn, 0, "确定");
      this.$set(this.aliasBtn, 1, true);
      this.$set(this.aliasBtn, 2, "请输入个性域名");
    } else {
      const { alias } = this.formData;
      if (!isMiddle(alias.length, 3, 12)) return;

      const res = await setAlias(alias);
      if (!res) return;

      this.$Message.success("设置成功");
      this.$store.commit("setUserInfo", {
        key: "alias",
        val: alias,
      });
      this.userInfo.alias = alias;
      this.initBtns();
    }
  }
  private async passwordBtnClick() {
    if (!this.passwordBtn[1]) {
      this.$set(this.passwordBtn, 0, "确定");
      this.$set(this.passwordBtn, 1, true);
    } else {
      const { oldPassword: older, newPassword: newer } = this.formData;
      if (
        older === newer ||
        !isMiddle(older.length, 6, 20) ||
        !isMiddle(newer.length, 6, 20)
      ) {
        return;
      }
      const { oldPassword, newPassword } = this.formData;
      const res = await setPassword({
        oldPassword,
        newPassword,
      });

      if (!res) return;
      this.$Message.success("修改成功");
      this.formData.oldPassword = "";
      this.formData.newPassword = "";
      this.$set(this.passwordBtn, 0, "修改");
      this.$set(this.passwordBtn, 1, false);
    }
  }

  // 用户信息监听变化，重新初始化状态
  @Watch("$store.state.userInfo")
  private onUserInfoChange(newVal: object) {
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

    .password-wrap {
      .mb30 {
        margin-bottom: 30px;
      }

      .mb10 {
        margin-bottom: 10px;
      }
    }

    .affix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: #8e8787;
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
