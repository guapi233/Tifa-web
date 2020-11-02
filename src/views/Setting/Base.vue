<template>
  <div class="setting-base-outermost">
    <div class="header-box">
      <div class="pic">
        <img :src="userPic" alt="" />
      </div>

      <div class="handle-box">
        <!-- <Button class="handle-item" shape="circle">删除头像</Button> -->
        <Button class="handle-item" type="primary" shape="circle"
          >上传新头像</Button
        >
      </div>
    </div>
    <div class="item-box">
      <Form
        ref="registerForm"
        :model="formData"
        :rules="validateRules"
        class="setting-form-reset"
      >
        <FormItem prop="name" label="名称">
          <Input
            class="setting-input-reset"
            size="large"
            v-model="formData.name"
            placeholder="您的名称"
          />
        </FormItem>
        <FormItem prop="occupation" label="职业">
          <Input
            class="setting-input-reset"
            size="large"
            v-model="formData.occupation"
            placeholder="您的职业"
          />
        </FormItem>

        <FormItem prop="gender" label="性别">
          <div class="gender">
            <RadioGroup v-model="formData.gender" class="gender-box">
              <Radio :label="1" class="gender-item">
                <span>男</span>
              </Radio>
              <Radio :label="0" class="gender-item">
                <span>女</span>
              </Radio>
              <Radio :label="2" class="gender-item">
                <span>无</span>
              </Radio>
            </RadioGroup>
          </div>
        </FormItem>

        <FormItem prop="interest" label="兴趣爱好">
          <Input
            class="setting-input-reset"
            size="large"
            placeholder="您比较感兴趣的东西"
            v-model="formData.interest"
          />
        </FormItem>

        <FormItem prop="summary" label="个人简介">
          <Input
            class="setting-input-reset"
            size="large"
            placeholder="一句话介绍一下您自己吧"
            v-model="formData.summary"
          />
        </FormItem>
      </Form>
    </div>
    <div class="sub-box">
      <Button
        type="primary"
        shape="circle"
        style="padding: 0 30px;"
        @click="save"
        :loading="saveBtnLoading"
      >
        保存
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { editUserInfo } from "@/api/user";
import { getUserInfo } from "@/api/public";
import config from "@/config";

@Component
export default class SettingBase extends Vue {
  private formData = {
    name: "",
    occupation: "",
    gender: 2,
    interest: "",
    summary: ""
  };
  private validateRules = {
    name: [{ required: true, message: "请输入您的名称", trigger: "blur" }]
  };
  private saveBtnLoading = false;

  private get userPic() {
    return this.$store.state.userInfo.pic
      ? config.baseUrl + this.$store.state.userInfo.pic
      : "data:image/gif;base64,R0lGODlhSABIAPQAAOfn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQAAAAALAAAAABIAEgAAAX+oCCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaW4Fk4JgLAACCAYEwEDiXzJiTsIhULGBLJcIoOAHKZBYFKEAsmLh8fplAGIkDdYBdi5INcHODhBgXYA59awEDEYWPhBZmflYCEpCYcRYJUJQBjpmYFGp+AA2hoQ+dWQEFgqiQFweKRgAQsKEStEQBBK+4jxcGu0IAC8ChDqtFAKDIkBPEQhTPmBZVRr0X1bGTRa3b3IXC0j7g4uPD2QXh6HTq3+zug+TZBO3zht5DSQf4+QhIBekl4V++OvCABHCQD1KEcjmaNXxEYQiABxMLPRQSAMGFjyBDihxJUiSGBcv+fgQoWLKly5AV+Fj097JmSZTMHNjcCXLjNwETeNqsQABij14VhLq0cCAlEQAGkioduckpMwZTR6ryNEBq1kMJ1xj7+nErJSsBgmYlavSpAQtZFVgVu0ApBmVnTZgSCqFS3hIBKOyM2ZYVy5oV/qJYOVjxicCDZTr+44tn08kiAOjk+bAwLwBYlSbyPHDh175zPxc4nJUCAjRMnAwIRDbkAwKwLQIYwMBrbZAVHBR4QvqFEwEIIPj+LdJCBAUDcuPY0kAw86HCpc/Y4gDudaEWIBjQ/gIKA+/fp1p4ED0GgAMTDKX/iqGC3MJJzs+//sBviiUQ7JeeBLj914iA800rMNxjloTh4IMQRijhhBRKOEFRgAUQYIUcduhhhRJI9sd5H5ZooocXQIBFCAA7";
  }

  // 保存并提交修改
  private async save() {
    this.saveBtnLoading = true;

    // 1. 修改信息
    const res = await editUserInfo(this.formData);

    if (res) {
      // 2. 获取修改成功的信息
      const res = await getUserInfo(this.$store.state.userInfo.usernumber);

      // 3. 修改本地缓存
      this.$store.commit("setUserInfoAndToken", {
        userInfo: res
      });
      this.$Message.success("修改成功");
    }
    this.saveBtnLoading = false;
  }

  private created() {
    const { userInfo } = this.$store.state;

    if (userInfo.usernumber) {
      this.formData = userInfo;
    } else {
      // go to 404
      this.$router.replace({
        path: "/whoops"
      });
    }
  }
}
</script>

<style lang="scss">
.setting-base-outermost {
  .header-box {
    padding: 16px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .pic {
      img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
      }
    }

    .handle-box {
      display: flex;

      .handle-item {
        margin-left: 8px;
      }
    }
  }

  .item-box {
    padding: 24px 20px;
    background: #fff;
    text-align: center;
    margin: 12px 0;

    .gender {
      padding: 0 20px;
      .gender-box {
        width: 100%;
        display: flex;
        color: $contentColor;

        .gender-item {
          margin-right: 20px;
        }
      }
    }
  }

  .sub-box {
    text-align: center;
    margin-top: 40px;
  }

  /* 设置页 Form 重置样式 */
  .setting-form-reset {
    .ivu-form-item-label {
      font-size: 16px !important;
      color: $contentColor;
    }

    .setting-input-reset {
      input {
        background-color: #f5f5f5;
        padding: 20px 15px 20px 14px;
        font-size: 14px;
        height: 60px;
        border: none;

        &:focus {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
