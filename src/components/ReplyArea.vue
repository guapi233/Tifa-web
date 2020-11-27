<template>
  <div class="reply-area-outermost" v-on="$listeners">
    <!-- <div class="backdrop">
      <div class="highlights"></div>
    </div> -->
    <!-- <textarea
      :value="value"
      @input="inputChange"
      class="reply-input"
    ></textarea> -->
    <Ctextarea
      :value.sync="inputVal"
      @onReady="textareaLoaded"
      class="reply-input"
      :style="style"
      placeholder="和小伙伴们一起探讨下吧"
    />
    <div class="handle-box">
      <Button shape="circle" class="reply-btn" @click="onSubmit">评论</Button>
      <EmojiPop @click.native="inputFocus" :selected="insertEmoji">
        <div class="upload">
          <Icon type="md-images" size="16" />
        </div>
      </EmojiPop>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Ctextarea from "@/components/Ctextarea.vue";
import EmojiPop from "@/components/EmojiPop.vue";

@Component({
  components: { Ctextarea, EmojiPop },
})
export default class ReplyArea extends Vue {
  @Prop({ default: "" }) private value!: string;
  @Prop({ default: 122 }) private height!: number | string;
  @Prop({ default: false }) private autoFlow!: boolean;
  // 文本域工具（占位，在 textareaLoaded 被重新赋值)
  private inputFocus = () => 1;
  private insertElm = (elm: any) => 1;

  // 嫁接 父组件 与 自定义文本域 的中间变量
  private get inputVal() {
    return this.value;
  }
  private set inputVal(newVal: string) {
    this.$emit("update:value", newVal);
  }

  // 样式处理
  private get style() {
    if (this.autoFlow !== false) {
      return { height: this.height + "px", overflow: "auto" };
    } else {
      return { "min-height": this.height + "px" };
    }
  }

  // 输入框加载完毕
  private textareaLoaded(tools: any) {
    const { focus, insertElm } = tools;
    this.inputFocus = focus;
    this.insertElm = insertElm;
  }

  // 插入表情
  private insertEmoji(emojiObj: any) {
    const { url, type, size } = emojiObj;

    // 判断是否为颜文字
    let elm: any;
    if (type === "3") {
      elm = url;
    } else {
      elm = document.createElement("img");
      elm.src = url;
      elm.className = `emoji-size-${size}`;
    }

    // 查询EMOJI
    this.insertElm(elm);
  }

  // 提交评论
  private onSubmit() {
    if (this.inputVal === "") {
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

  /* .backdrop {
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
  } */

  .reply-input {
    position: relative;
    z-index: 2;
    margin-bottom: 20px;
    width: 100%;
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

    .emoji-size-big {
      width: 40px;
      height: 40px;
      margin: 0 2px;
      vertical-align: text-bottom;
    }

    .emoji-size-small {
      width: 20px;
      height: 20px;
      margin: 0 2px;
      vertical-align: text-bottom;
    }
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
