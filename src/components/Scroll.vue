<template>
  <div class="scroll-outermost" ref="wrapBox" @scroll="handleScroll">
    <div class="scroll-content" ref="contentBox">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";

@Component
export default class Scroll extends Vue {
  @Prop({ default: null }) private onReachTop!: Function;
  @Prop({ default: null }) private onReachBottom!: Function;
  @Prop({ default: false }) private isEnd!: boolean;
  @Prop({ default: "top" }) private at!: string;
  @Ref("wrapBox") private wrapBox!: any;
  @Ref("contentBox") private contentBox!: any;
  private canScroll = true;

  // 入口
  private mounted() {
    this.canScroll = false;
    this.setScrollPos();
    this.canScroll = true;
  }

  // 处理滚动
  private async handleScroll() {
    if (this.isEnd) return;

    this.onReachTop && this.handleScrollTop();
    this.onReachBottom && this.handleScrollBottom();
  }
  // 到顶时触发
  private async handleScrollTop() {
    if (this.wrapBox.scrollTop === 0) {
      this.canScroll = false;
      await this.onReachTop();
      this.canScroll = true;
    }
  }
  // 到底时触发
  private async handleScrollBottom() {
    if (
      this.wrapBox.scrollTop + this.wrapBox.clientHeight >=
      this.contentBox.clientHeight
    ) {
      this.canScroll = false;
      await this.onReachBottom();
      this.canScroll = true;
    }
  }

  // 设置滚动条盘位置
  private setScrollPos() {
    if (this.at === "bottom") {
      this.wrapBox.scrollTop =
        this.contentBox.clientHeight - this.wrapBox.clientHeight;
    }
  }
}
</script>

<style lang="scss">
.scroll-outermost {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-right: 5px;
}
</style>
