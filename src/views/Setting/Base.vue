<template>
  <div class="setting-base-outermost">
    <div class="header-box">
      <div class="pic">
        <!-- <img :src="userPic" alt="" /> -->
        <Avatar :src="userInfo.pic" size="60" />
      </div>

      <div class="handle-box">
        <!-- <Button class="handle-item" shape="circle">删除头像</Button> -->
        <Upload
          :action="uploadPicUrl"
          :headers="headers"
          :show-upload-list="false"
          :max-size="5000000"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-err="uploadFail"
        >
          <Button
            class="handle-item upload"
            type="primary"
            shape="circle"
            :loading="uploadBtnLoading"
          >
            上传新头像
          </Button>
        </Upload>
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
import { uploadPic } from "@/api/user";
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
  private uploadBtnLoading = false;
  private headers = {
    Authorization: "bearer " + this.$store.state.token
  };

  private get userInfo() {
    return this.$store.state.userInfo;
  }
  private get uploadPicUrl() {
    return (
      config.baseUrl +
      "/user/uploadPic?usernumber=" +
      this.$store.state.userInfo.usernumber
    );
  }

  // 用户上传头像钩子
  private beforeUpload() {
    this.uploadBtnLoading = true;
  }
  private async uploadSuccess(res: any) {
    res = await getUserInfo(this.$store.state.userInfo.usernumber);

    // 修改本地缓存
    this.$store.commit("setUserInfoAndToken", {
      userInfo: res
    });
    this.uploadBtnLoading = false;
    this.$Message.success("上传成功");
  }
  private uploadFail(err: any) {
    this.$Message.error("上传失败");
    this.uploadBtnLoading = false;
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

      .upload {
        position: relative;

        .invisible {
          display: none;
        }
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
}
</style>
