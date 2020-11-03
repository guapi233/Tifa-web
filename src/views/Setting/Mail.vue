<template>
  <div class="setting-mail-outermost">
    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">邮件通知</span>
        </div>
        <i-switch v-model="formData.emailNotice" />
      </div>
    </div>

    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">每日消息汇总</span>
          <span class="sub">（如 点赞、评论以及充电 等高频通知）</span>
        </div>
        <i-switch v-model="formData.daliyMessageNotice" />
      </div>
      <div class="flex-box">
        <div class="left">
          <span class="title">重要信息通知</span>
          <span class="sub">（如 账号变动、管理员操作 等重要通知）</span>
        </div>
        <i-switch v-model="formData.importantMessageNotice" />
      </div>
    </div>

    <div class="sub-box">
      <Button type="primary" shape="circle" style="padding: 0 30px;">
        保存
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SettingMail extends Vue {
  private formData = {
    emailNotice: true,
    daliyMessageNotice: true,
    importantMessageNotice: true
  };
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
