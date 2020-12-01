<template>
  <div class="setting-mail-outermost">
    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">消息通知</span>
        </div>
        <i-switch v-model="notice" />
      </div>
    </div>

    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">每日消息汇总</span>
          <span class="sub">（如 点赞、评论以及私信 等高频通知）</span>
        </div>
        <i-switch v-model="dailyNotice" />
      </div>
      <div class="flex-box">
        <div class="left">
          <span class="title">重要信息通知</span>
          <span class="sub">（如 账号变动、管理员操作 等重要通知）</span>
        </div>
        <i-switch v-model="importNotice" />
      </div>
    </div>

    <div class="sub-box">
      <Button
        type="primary"
        shape="circle"
        style="padding: 0 30px"
        @click="setNotice"
      >
        保存
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setNotice } from "@/api/user";

@Component
export default class SettingMail extends Vue {
  private dailyNotice: boolean | number = !!this.$store.state.userInfo
    .dailyNotice;
  private importNotice: boolean | number = !!this.$store.state.userInfo
    .importNotice;

  private get notice() {
    return !!(this.dailyNotice && this.importNotice);
  }
  private set notice(newVal: boolean) {
    this.dailyNotice = newVal;
    this.importNotice = newVal;
  }

  private async setNotice() {
    let { dailyNotice, importNotice } = this;
    dailyNotice = Number(dailyNotice);
    importNotice = Number(importNotice);

    const res = await setNotice({
      dailyNotice,
      importNotice,
    });

    if (res) {
      this.$Message.success("设置成功");
      this.$store.commit("setUserInfoAndToken", {
        userInfo: res,
      });
    }
  }
}
</script>

<style lang="scss">
.setting-mail-outermost {
  .item-box {
    padding: 24px 20px;
    background: #fff;
    text-align: center;
    margin-bottom: 12px;

    .flex-box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .title {
        font-size: 16px;
        color: #292525;
      }

      .sub {
        font-size: 14px;
        color: $contentColor;
      }
    }
  }

  .sub-box {
    text-align: center;
    margin-top: 40px;
  }
}
</style>
