<template>
  <div
    class="ctextarea"
    :class="{ placeholder: !value }"
    ref="ctextarea"
    @input="onInput"
    contenteditable
    v-on="$listeners"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";

@Component
export default class Ctextarea extends Vue {
  @Prop({ default: "" }) private value!: string;
  @Ref("ctextarea") private ctextarea!: any;
  private selection: any = window.getSelection();

  private mounted() {
    // 对外暴露工具方法
    this.$emit("onReady", {
      focus: this.focus,
      insertElm: this.insertElm,
    });
  }

  private insertElm(element: any) {
    // 1. 判断光标存在的元素，根据不同类型的元素做出不同的处理（光标可能处于的节点类型在 focus 函数中有表明）
    if (this.selection.anchorNode === this.ctextarea) {
      // 1.1 在空的文本域中直接插入元素
      this.ctextarea.appendChild(document.createTextNode(""));
      this.ctextarea.insertAdjacentElement("afterbegin", element);
    } else {
      // 1.1 从selection获取当前光标的状态
      const { anchorNode, anchorOffset } = this.selection;
      // 1.2 从光标处切割文本节点

      const afterNode = anchorNode.splitText(anchorOffset);
      // 1.3 在切开的两个文本节点间插入元素
      afterNode.parentNode.insertBefore(element, afterNode);
    }

    // 2. 提醒父组件内容状态变化 & 重新固定光标
    this.$emit("update:value", this.ctextarea.innerHTML);
    this.focus();
  }

  // 文本域聚焦
  private focus() {
    // 1. 文本域聚焦
    this.ctextarea.focus();

    // if (!this.selection?.rangeCount) return;

    // 2. 调整光标位置
    const range = this.selection?.getRangeAt(0);
    // 2.1 光标可能处于的元素：①ctextarea；②ctextarea的文本节点；③ctextarea中div的文本节点
    const lastChild: any = Array.from(this.ctextarea.childNodes).pop();
    let startNode = lastChild || this.ctextarea;
    startNode = startNode.childNodes[0] || startNode;
    // 2.2 光标的位置：如果分段了就处在最后段的最后，否则为ctextarea全部内容的最后
    const startPos = lastChild
      ? lastChild.textContent.length
      : this.ctextarea.textContent.length;

    // 3. 设置光标位置
    range?.setStart(startNode, startPos);
  }

  // 监听输入
  private onInput(e: any) {
    this.$emit("update:value", e.target.innerHTML);
  }
}
</script>

<style lang="scss">
.ctextarea {
  position: relative;
  outline: none;
}

.placeholder {
  &::before {
    content: attr(placeholder);
    position: absolute;
    top: 0;
    left: 0;
    color: #99a2aa;
  }
}
</style>
