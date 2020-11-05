<template>
  <div class="reply-area-outermost">
    <div class="backdrop">
      <div class="highlights"></div>
    </div>
    <textarea
      :value="value"
      @input="inputChange"
      class="reply-input"
    ></textarea>
    <div class="handle-box">
      <Button shape="circle" class="reply-btn" @click="onSubmit">评论</Button>
      <div class="upload">
        <Icon type="md-images" size="16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ReplyArea extends Vue {
  @Prop({ default: "" }) private value!: string;

  // 输入框值变换时 通知父组件
  private inputChange(e: any) {
    this.$emit("input", e.target.value);
  }

  // 提交评论
  private onSubmit() {
    if (this.value === "") {
      this.$Message.error("输入内容不能为空");
    } else {
      this.$emit("onSubmit");
    }
  }
}
</script>

<style lang="scss">
.reply-area-outermost {
  position: relative;

  .backdrop {
    position: absolute;
    z-index: 1;
    top: 0;
    padding: 2px;
    color: #211615;
    width: calc(100% - 54px);
    height: 122px;
    background-color: #fff;
    color: #292525;
    overflow: auto;
    pointer-events: none;
    transition: transform 1s;
    font-size: 16px;
    outline: 0;
    resize: none;
    border: none;
    font-weight: 400;
    line-height: 1.6;

    .highlights {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.6;
      color: transparent;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  .reply-input {
    position: relative;
    z-index: 2;
    margin-bottom: 20px;
    width: 100%;
    min-height: 122px;
    height: auto;
    background-color: transparent;
    color: #292525;
    font-size: 16px;
    box-sizing: border-box;
    outline: 0;
    resize: none;
    border: none;
    font-weight: 400;
    line-height: 1.6;
  }

  .handle-box {
    display: flex;

    .reply-btn {
      margin-right: 10px;
    }

    .upload {
      width: 30px;
      height: 30px;
      background: #f5f5f5;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
}
</style>
