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
  @Prop({ default: () => 1 }) private onReachBottom!: Function;
  @Prop({ default: false }) private isEnd!: boolean;
  @Ref("wrapBox") private wrapBox!: any;
  @Ref("contentBox") private contentBox!: any;
  private canScroll = true;

  private async handleScroll() {
    if (this.isEnd) return;

    if (
      this.wrapBox.scrollTop + this.wrapBox.clientHeight >=
      this.contentBox.clientHeight
    ) {
      this.canScroll = false;
      await this.onReachBottom();
      this.canScroll = true;
    }
  }
}
</script>

<style lang="scss">
.scroll-outermost {
  overflow: auto;
  height: 100%;
}
</style>
