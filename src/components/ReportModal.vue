<template>
  <Modal v-model="modalShow" class-name="vertical-middle-modal" width="400">
    <!-- 头部 -->
    <template #header>
      <div class="report-modal-header">
        <p class="title">举报</p>
        <p class="sub-title">请选择举报理由</p>
      </div>
    </template>
    <!-- 内容 -->
    <template>
      <div class="report-list">
        <div class="report-item"></div>
      </div>
    </template>
    <!-- 底部 -->
    <template #footer>
      <Button type="primary">举报</Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ReportModal extends Vue {
  @Prop({ default: false }) private show!: boolean;

  private get modalShow() {
    return this.show;
  }
  private set modalShow(newVal: boolean) {
    this.$emit("update:show", newVal);
  }
}
</script>

<style lang="scss">
.report-modal-header {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;

  p {
    height: auto;
    line-height: 1;
  }

  .title {
    margin-top: 40px;
    font-size: 24px;
    font-weight: 500;
    color: #121212;
    text-align: center;
  }

  .sub-title {
    padding: 0 38px;
    margin-top: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: #8590a6;
    text-align: center;
  }
}

.vertical-middle-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
