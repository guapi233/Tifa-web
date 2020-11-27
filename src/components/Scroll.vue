<template>
  <div class="scroll-outermost" ref="wrapBox" @scroll="handleScroll">
    <div class="scroll-content" ref="contentBox">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { slidePage } from "@/utils/index";
import { VNodeChildren } from "vue";

@Component
export default class Scroll extends Vue {
  // 顶部触发如果需要添加元素，需要返回新添加的数量，确保滚动条出现在正常的位置
  @Prop({ default: null }) private onReachTop!: Function;
  @Prop({ default: null }) private onReachBottom!: Function;
  @Prop({ default: false }) private isEnd!: boolean;
  @Prop({ default: "top" }) private at!: string;
  @Prop({ default: null }) private onReady!: Function;
  @Ref("wrapBox") private wrapBox!: any;
  @Ref("contentBox") private contentBox!: any;
  private canScroll = true;
  private slider: any = null;
  private slidePos: any = {};

  // 入口
  private mounted() {
    // 初始化滚动条
    this.canScroll = false;
    this.setScrollPos(); // 初始化滚动条位置
    this.slider = slidePage(300, this.wrapBox); // 初始化滑动器
    this.slidePos = {
      bottom: () => {
        return this.contentBox.scrollHeight - this.wrapBox.clientHeight;
      },
    }; // 初始化滚动语义
    this.canScroll = true;

    // 准备完毕
    this.onReady &&
      this.onReady({
        scrollTo: this.scrollTo,
      });
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
      const newCount = await this.onReachTop();
      this.$nextTick(() => {
        if (newCount) {
          let keepScroll = 0;
          const contextBoxChildren = this.contentBox.children;
          for (let i = 0; i < newCount; i++) {
            keepScroll += contextBoxChildren[i].clientHeight;
          }

          this.wrapBox.scrollTo(0, keepScroll);
        }
      });
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
  // 滚动到指定位置
  private scrollTo(des: any, transition = false) {
    this.$nextTick(() => {
      if (typeof des === "string") {
        des = this.slidePos[des]();
      }

      if (transition) {
        this.slider(des);
      } else {
        this.wrapBox.scrollTo(0, des);
      }
    });
  }
}
</script>

<style lang="scss">
.scroll-outermost {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
</style>
