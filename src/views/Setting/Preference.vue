<template>
  <div class="setting-preference-outermost">
    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">图片水印</span>
          <span class="sub">（在我上传的图片右下角打上水印）</span>
        </div>
        <i-switch v-model="formData.picWatermark" />
      </div>
    </div>

    <div class="item-box">
      <div class="flex-box">
        <div class="left">
          <span class="title">动态展示</span>
          <span class="sub">（对其他小伙伴展示我的动态）</span>
        </div>
        <i-switch v-model="formData.updateShow" />
      </div>
      <div class="flex-box">
        <div class="left">
          <span class="title">收藏展示</span>
          <span class="sub">（对其他小伙伴展示我的收藏）</span>
        </div>
        <i-switch v-model="formData.collectionShow" />
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
export default class SettingPreference extends Vue {
  private formData = {
    picWatermark: true,
    updateShow: true,
    collectionShow: true
  };
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
