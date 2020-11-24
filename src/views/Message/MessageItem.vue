<template>
  <div class="message-item-outermost" v-if="msgShow">
    <div class="item">
      <div class="left-box">
        <Avatar size="46" :src="authorObj.pic" />
      </div>
      <div class="center-box">
        <div class="top">
          <span class="name">{{ authorObj.name }}</span>
          <span class="tip"
            >{{ types[type] }}了我的{{ targetTypes[msgObj.type] }}</span
          >
        </div>
        <div class="middle" v-if="msgObj.reply" v-html="msgObj.reply"></div>
        <div class="bottom">
          <span class="time">{{ dateFormat(msgObj.created) }}</span>
          <span
            class="reply"
            @click="replyShow = !replyShow"
            :class="{ showed: replyShow }"
            v-if="replyBox !== false"
          >
            <Icon type="md-text" size="16" />回复</span
          >
          <span
            class="like"
            v-if="likeBox !== false"
            :class="{ liked: msgObj.isLiked }"
            @click="addLike"
          >
            <Icon type="md-thumbs-up" size="16" />{{
              msgObj.isLiked ? "已赞" : "点赞"
            }}</span
          >
          <span
            class="set-read"
            v-if="!msgObj.isRead"
            title="设置已读后该条信息将不再显示"
            @click="setIsRead"
            >设置已读</span
          >
          <div class="reply-box" v-if="replyShow">
            <ReplyArea @onSubmit="reply" :value.sync="inputVal" />
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="text-box" v-html="msgObj.content"></div>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Avatar from "@/components/Avatar.vue";
import ReplyArea from "@/components/ReplyArea.vue";
import { dateFormat } from "@/utils/index";
import { setIsRead, addLike, addComment } from "@/api/content";

@Component({
  components: { Avatar, ReplyArea },
})
export default class MessageItem extends Vue {
  @Prop({ default: () => ({}) }) private msgObj!: any;
  @Prop({ type: Number }) private type!: number;
  @Prop({ default: false }) private replyBox!: any;
  @Prop({ default: false }) private likeBox!: any;
  private msgShow = true;
  private inputVal = "";
  private replyShow = false;
  private dateFormat = dateFormat;
  // 操作的类型：0为点赞、1为评论
  private types = ["点赞", "评论"];
  // 操作对象的类型：0为文章、1为评论
  private targetTypes = ["文章", "评论"];

  private get authorObj() {
    return this.msgObj.authorObj || {};
  }

  // 点赞
  private async addLike() {
    const res = await addLike(this.msgObj.commentId, 1);

    this.msgObj.isLiked = !this.msgObj.isLiked;
    if (typeof res === "object") {
      this.$Message.success("点赞成功");
    } else {
      this.$Message.info(res);
    }
  }

  // 评论
  private async reply() {
    // belong 和 belongType 存在则表明评论的目标为二级评论，而这两个变量时一级评论的Id和type
    const targetId = this.msgObj.belong || this.msgObj.commentId;
    const targetType =
      typeof this.msgObj.belongType === "undefined"
        ? this.msgObj.type
        : this.msgObj.belongType;

    const params: any = {
      targetId,
      replyId: this.msgObj.authorId,
      content: this.inputVal,
      type: 1,
      targetType,
    };

    // 只有在评论对象是评论时才携带 二级评论标志
    if (this.msgObj.type === 1) {
      params.secondLevelCommentId = this.msgObj.commentId;
    }

    const res = await addComment(params);

    if (res) {
      this.$Message.success("评论成功");

      // 关闭输入框 & 清空输入内容
      this.replyShow = false;
      this.inputVal = "";
    }
  }

  // 设置已读状态
  private async setIsRead() {
    const idNames = ["likeId", "commentId", "followId"];

    const res: any = await setIsRead(
      this.type,
      this.msgObj[idNames[this.type]]
    );

    if (res) {
      this.$Message.success(res);
      this.msgObj.isRead = 1;
      this.msgShow = false;
    }
  }
}
</script>

<style lang="scss">
.message-item-outermost {
  .item {
    padding-top: 24px;
    padding-bottom: 24px;
    position: relative;
    cursor: pointer;
    display: flex;

    .emoji-size-big,
    .emoji-size-small {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }

    .left-box {
      width: 46px;
      height: 46px;
      margin-right: 20px;
    }

    .center-box {
      flex: 1;

      &:hover {
        .bottom {
          .set-read {
            display: inline;
          }
        }
      }

      .top {
        margin-bottom: 10px;

        .name {
          margin-right: 8px;
          color: #333;
        }

        .tip {
          color: $contentColor;
        }
      }

      .middle {
        margin: 0 10px 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #333;
      }

      .bottom {
        color: $contentColor;

        .time {
          margin-right: 15px;
        }

        .reply,
        .like {
          margin-right: 14px;
          &:hover {
            color: $primaryColor;
          }

          i {
            margin-right: 1px;
          }
        }

        .liked {
          color: $primaryColor;
        }

        .showed {
          color: $primaryColor;
        }

        .reply-box {
          padding: 10px;
          background-color: rgba(153, 153, 153, 0.041);
          width: 100%;
          cursor: text;
        }

        .set-read {
          display: none;

          &:hover {
            color: $primaryColor;
          }
        }
      }
    }

    .right-box {
      min-width: 60px;

      .text-box {
        width: 60px;
        height: 60px;
        font-size: 14px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: $contentColor;
      }
    }
  }
}
</style>
