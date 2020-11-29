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
      :placeholder="placeholder"
    />
    <div
      class="handle-box"
      :class="{ 'tools-reverse': toolsReverse !== false }"
    >
      <Button shape="circle" class="reply-btn" @click="onSubmit">评论</Button>
      <EmojiPop @click.native="inputFocus" :selected="insertEmoji">
        <div class="upload">
          <Icon type="md-happy" size="20" />
        </div>
      </EmojiPop>

      <Upload
        :accept="config.supportImgCategorys"
        :action="uploadUrl"
        :headers="headers"
        :show-upload-list="false"
        :max-size="5000000"
        :on-success="uploadSuccess"
        :on-err="uploadFail"
        :disabled="imgUploading"
      >
        <div class="img-upload">
          <Button type="text" :loading="imgUploading" icon="md-images"></Button>
        </div>
      </Upload>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Ctextarea from "@/components/Ctextarea.vue";
import EmojiPop from "@/components/EmojiPop.vue";
import config from "@/config";

@Component({
  components: { Ctextarea, EmojiPop },
})
export default class ReplyArea extends Vue {
  @Prop({ default: "" }) private value!: string;
  @Prop({ default: 122 }) private height!: number | string;
  @Prop({ default: false }) private autoFlow!: boolean; // 是否开始固定高，内容滚动
  @Prop({ default: false }) private toolsReverse!: boolean; // 工具栏是否反转
  @Prop({ default: "和小伙伴们一起探讨下吧" }) private placeholder!: string;
  private config = config;
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

  // 图片上传
  private imgUploading = false;
  private headers = {
    Authorization: "bearer " + this.$store.state.token,
  };
  private get uploadUrl() {
    return config.baseUrl + "/uploadImg";
  }
  private uploadSuccess(res: any) {
    if (res.isOk) {
      console.log("??");
    } else {
      this.$Message.error("上传失败");
    }
  }
  private uploadFail(err: any) {
    console.log("fail", err);
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
      margin: 0 10px;
    }

    .upload,
    .img-upload {
      width: 30px;
      height: 30px;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .img-upload {
      button {
        padding: 0;
        height: auto;
      }
    }
  }

  .tools-reverse {
    flex-direction: row-reverse;
  }
}
</style>
