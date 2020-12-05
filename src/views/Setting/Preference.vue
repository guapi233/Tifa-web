<template>
  <div class="setting-preference-outermost">
    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">图片水印</span>
          <span class="sub">（在我上传的图片右下角打上水印）</span>
        </div>
        <i-switch v-model="picWatermark" />
      </div>
    </div>

    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">动态展示</span>
          <span class="sub">（对其他小伙伴展示我的动态）</span>
        </div>
        <i-switch v-model="trendVisible" />
      </div>
      <div class="flex-box">
        <div class="left">
          <span class="title">收藏展示</span>
          <span class="sub">（对其他小伙伴展示我的收藏）</span>
        </div>
        <i-switch v-model="collectionVisible" />
      </div>
    </div>

    <div class="sub-box">
      <Button
        type="primary"
        shape="circle"
        style="padding: 0 30px"
        @click="save"
      >
        保存
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setMinePre } from "@/api/user";

@Component
export default class SettingPreference extends Vue {
  private picWatermark = true;
  private userInfo = this.$store.state.userInfo;
  private trendVisible: any = Boolean(this.userInfo.trendVisible);
  private collectionVisible: any = Boolean(this.userInfo.collectionVisible);

  // 提交表单
  private async save() {
    const { trendVisible, collectionVisible } = this;
    const res = await setMinePre({
      trendVisible,
      collectionVisible,
    });

    if (!res) return;

    this.$Message.success("设置成功");
    this.userInfo.trendVisible = Number(this.trendVisible);
    this.userInfo.collectionVisible = Number(this.collectionVisible);
    this.$store.commit("setUserInfoAndToken", {
      userInfo: this.userInfo,
    });
  }
}
</script>

<style lang="scss">
.setting-preference-outermost {
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
