<template>
  <div
    class="ctextarea"
    :class="{ placeholder: !value }"
    ref="ctextarea"
    @input="onInput"
    @click="checkClick"
    @dragover.prevent="1"
    @drop.prevent="1"
    @paste.prevent="1"
    contenteditable
    v-on="$listeners"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from "vue-property-decorator";
import { hasElm } from "@/utils";

@Component
export default class Ctextarea extends Vue {
  @Prop({ default: "" }) private value!: string;
  @Ref("ctextarea") private ctextarea!: any;
  private selection: any = window.getSelection();
  private cursorNode: any = null;
  private cursorPos = 0;

  private mounted() {
    // 对外暴露工具方法
    this.$emit("onReady", {
      focus: this.focus,
      insertElm: this.insertElm,
    });
  }

  private insertElm(element: any) {
    // 1. 判断光标存在的元素，根据不同类型的元素做出不同的处理（光标可能处于的节点类型在 focus 函数中有表明）
    this.cursorNode = this.cursorNode || this.ctextarea;

    if (this.cursorNode.nodeType !== 3) {
      // 1.1 在空的文本域中直接插入元素
      const textNode = document.createTextNode("");
      this.cursorNode.prepend(textNode);
      if (typeof element === "string") {
        this.cursorNode.insertAdjacentText("afterbegin", element);
      } else {
        this.cursorNode.insertAdjacentElement("afterbegin", element);
      }

      this.cursorNode = textNode;
      this.cursorPos = 0;
    } else {
      if (typeof element === "string") {
        this.cursorNode.insertData(this.cursorPos, element);
        this.cursorPos += element.length;
      } else {
        // 1.1 从光标处切割文本节点
        const afterNode = this.cursorNode.splitText(this.cursorPos);
        // 1.2 在切开的两个文本节点间插入元素
        this.cursorNode = afterNode;
        this.cursorPos = 0;
        afterNode.parentNode.insertBefore(element, afterNode);
      }
    }

    // 2. 提醒父组件内容状态变化 & 重新固定光标
    this.$emit("update:value", this.ctextarea.innerHTML);
  }

  // 文本域聚焦
  private focus() {
    // 1. 文本域聚焦
    this.ctextarea.focus();

    // if (!this.selection?.rangeCount) return;

    // 2. 调整光标位置
    const range = this.selection?.getRangeAt(0);
    const lastChild: any = Array.from(this.ctextarea.childNodes).pop();
    // 2.1 光标可能处于的元素：①ctextarea；②ctextarea的文本节点；③ctextarea中div的文本节点
    // 如果存在 cursorNode 就使用，如果没有就是展示在最后
    let startNode;
    if (this.cursorNode) {
      startNode = this.cursorNode;
    } else {
      startNode = lastChild || this.ctextarea;
      startNode = startNode.childNodes[0] || startNode;
    }

    // 2.2 光标的位置：如果分段了就处在最后段的最后，否则为ctextarea全部内容的最后
    // 如果存在 cursorPos 就使用，如果没有就是展示在最后
    const startPos = this.cursorPos || 0;

    // 3. 设置光标位置
    range?.setStart(startNode, startPos);
  }

  // 监听输入
  private onInput(e: any) {
    this.$emit("update:value", e.target.innerHTML);
    this.cursorNode = this.selection.anchorNode;
    this.cursorPos = this.selection.anchorOffset;
  }

  // 判断当前点击的元素是否为文本域内，如果是则更新光标位置
  private checkClick(e: any) {
    if (hasElm(this.ctextarea, this.selection.anchorNode)) {
      this.cursorNode = this.selection.anchorNode;
      this.cursorPos = this.selection.anchorOffset;
    }
  }

  // 监听 value 是否被清空
  @Watch("value")
  private onValueChange(newVal: string) {
    if (newVal === "") {
      this.ctextarea.innerHTML = "";
      this.cursorNode = this.ctextarea;
      this.cursorPos = 0;
    }
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
