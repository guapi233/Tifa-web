<template>
  <Button v-bind="$attrs" :disabled="countDowning" v-on="$listeners">
    <span v-if="countDowning && liveCountDown">
      {{ liveCountDown }}
    </span>
    <slot v-else />
  </Button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class CountDownButton extends Vue {
  @Prop({ default: 0 }) countDown!: number;
  private liveCountDown = this.countDown;
  private countDowning = false;
  private timer: any = null;

  private countDownStart() {
    this.countDowning = true;

    this.timer = setInterval(() => {
      this.liveCountDown--;

      if (this.liveCountDown <= 0) {
        clearInterval(this.timer);
        this.countDowning = false;
        this.$emit("update:countDown", 0);
      }
    }, 1000);
  }

  @Watch("countDown")
  private onCountDownChange(newVal: number) {
    if (!newVal) return;

    this.liveCountDown = newVal;
    this.countDownStart();
  }
}
</script>

<style lang="scss">
</style>
