<template>
  <div class="comment-reply-outermost">
    <div class="reply-box">
      <div>
        <div class="title-box">
          <div class="header-box">
            <Avatar
              size="40"
              :to="`/user/${userInfo.usernumber}`"
              :src="userInfo.pic"
            />
          </div>
          <div class="input-text" @click.stop="replyToShow" v-if="!replyShow">
            写下你的评论
          </div>
          <div class="input-name" v-else>
            <router-link :to="`/user/${userInfo.usernumber}`">{{
              userInfo.name
            }}</router-link>
            <Icon
              type="md-close"
              size="18"
              class="close-reply"
              @click="$emit('update:replyShow', false)"
            />
          </div>
        </div>
        <div class="comment-box" v-show="replyShow">
          <div class="backdrop">
            <div class="highlights"></div>
          </div>
          <!-- <textarea
            ref="replyInput"
            :value="inputVal"
            @input="inputChange"
            class="reply-input"
          ></textarea> -->
          <Ctextarea
            :value.sync="value"
            @onReady="textareaLoaded"
            class="reply-input"
            placeholder="和小伙伴们一起探讨下吧"
          />
          <div class="handle-box">
            <Button shape="circle" class="reply-btn" @click="onSubmit"
              >评论</Button
            >
            <EmojiPop @click.native="inputFocus" :selected="insertEmoji">
              <div class="upload">
                <Icon type="md-images" size="16" @click="inputFocus" />
              </div>
            </EmojiPop>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import Ctextarea from "@/components/Ctextarea.vue";
import EmojiPop from "@/components/EmojiPop.vue";

@Component({
  components: { Ctextarea, EmojiPop },
})
export default class CommentReply extends Vue {
  @Prop({ default: "userInfo" }) private userInfo!: any;
  @Prop({ default: false }) private replyShow!: boolean;
  @Prop({ default: "" }) private inputVal!: string;
  // 文本域工具（占位，在 textareaLoaded 被重新赋值)
  private inputFocus = () => 1;
  private insertElm = (elm: any) => 1;

  // 嫁接 父组件 与 自定义文本域 的中间变量
  private get value() {
    return this.inputVal;
  }
  private set value(newVal: string) {
    this.$emit("update:inputVal", newVal);
  }

  // 输入框加载完毕
  private textareaLoaded(tools: any) {
    const { focus, insertElm } = tools;
    this.inputFocus = focus;
    this.insertElm = insertElm;
  }

  // 显示回复输入框
  private replyToShow() {
    this.$emit("update:replyShow", true);
    this.$nextTick(() => {
      this.inputFocus();
    });
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
.comment-reply-outermost {
  .reply-box {
    .title-box {
      display: flex;
      align-items: center;
      font-size: 14px;

      .header-box {
        width: 40px;
        height: 40px;
        overflow: hidden;
        margin-right: 14px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 40px;
        }
      }

      .input-text {
        color: $contentColor;
        flex: 1;
        cursor: text;
      }

      .input-name {
        flex: 1;
        display: flex;
        justify-content: space-between;

        .close-reply {
          color: rgb(230, 45, 45);
          cursor: pointer;
        }
      }
    }

    .comment-box {
      position: relative;
      padding-left: 54px;
      margin-top: 10px;

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
  }
}
</style>
