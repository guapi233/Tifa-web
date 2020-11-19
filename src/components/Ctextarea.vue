<template>
  <div
    class="ctextarea"
    ref="ctextarea"
    contenteditable
    v-on="$listeners"
    @input="onInput"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";

@Component
export default class Ctextarea extends Vue {
  @Prop({ default: "" }) private value!: any;
  @Ref("ctextarea") private ctextarea!: any;
  private selection: any = window.getSelection();

  private mounted() {
    // 对外暴露工具方法
    this.$emit("onReady", {
      focus: this.focus,
    });
  }

  private onInput() {
    console.log(this.selection);
  }

  // 文本域聚焦
  private focus() {
    // 1. 文本域聚焦
    this.ctextarea.focus();

    // if (!this.selection?.rangeCount) return;

    // 2. 调整光标位置
    const range = this.selection?.getRangeAt(0);
    range?.setStart(
      this.ctextarea.childNodes[0] || this.ctextarea,
      this.ctextarea.textContent.length
    );
  }
}
</script>

<style lang="scss">
.ctextarea {
  outline: none;
}
</style>
