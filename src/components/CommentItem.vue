<template>
  <div class="comment-item-outermost">
    <div class="comment-list">
      <!-- 一级评论内容区 -->
      <div class="comment-container">
        <div class="comment-user">
          <div class="header-box">
            <Avatar
              :src="author.pic"
              :to="`/user/${commentObj.authorId}`"
              size="40"
            />
          </div>
          <div class="user-box">
            <div class="name">
              <router-link
                :to="`/user/${commentObj.authorId}`"
                class="user-link"
                >{{ author.name }}</router-link
              >
            </div>
            <div class="timer">{{ dateFormat(commentObj.created) }}</div>
          </div>
        </div>
        <div class="comment-content-box">
          <div class="comment-content">
            <div class="comment-txt">
              {{ commentObj.content }}
            </div>
            <div class="oper-box">
              <div class="oper-item" @click="secondReplyShow(commentObj)">
                <Icon type="md-text" size="20" />
                <span>{{ commentObj.commentCount }}</span>
              </div>
              <div
                class="oper-item"
                :class="{ commentLiked: commentObj.isLiked }"
                @click="likeComment(commentObj)"
              >
                <Icon type="md-thumbs-up" size="20" />
                <span>{{ commentObj.likeCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 二级评论内容区 -->
      <div class="comment-content-box">
        <div
          class="comment-children-item"
          v-for="child in children"
          :key="child.commentId"
        >
          <!-- 子 -->
          <div class="comment-container">
            <div class="comment-user">
              <div class="header-box">
                <Avatar
                  :src="child.author.pic"
                  :to="`/user/${child.authorId}`"
                  size="40"
                />
              </div>
              <div class="user-box">
                <div class="name">
                  <router-link to="/" class="user-link">{{
                    child.author.name
                  }}</router-link>
                  <span class="decoration">
                    <span v-if="child.replyId !== commentObj.authorId"
                      >回复
                      <router-link :to="`/user/${child.replyId}`">{{
                        child.reply.name
                      }}</router-link></span
                    >
                  </span>
                </div>
                <div class="timer">{{ dateFormat(child.created) }}</div>
              </div>
            </div>
            <div class="comment-content-box">
              <div class="comment-content">
                <div class="comment-txt">
                  {{ child.content }}
                </div>
                <div class="oper-box">
                  <div
                    class="oper-item"
                    @click="secondReplyShow(child, child.commentId)"
                  >
                    <Icon type="md-text" size="20" />
                    <span>{{ child.commentCount }}</span>
                  </div>
                  <div
                    class="oper-item"
                    :class="{ commentLiked: child.isLiked }"
                    @click="likeComment(child)"
                  >
                    <Icon type="md-thumbs-up" size="20" />
                    <span>{{ child.likeCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 二级评论回复框 -->
        <div
          class="comment-replyer"
          v-show="secondReplyShowId === commentObj.commentId"
        >
          <div class="reply-box">
            <div class="wrap">
              <div class="title-box">
                <div class="header-box">
                  <Avatar size="40" :src="userInfo.pic" />
                </div>
                <div class="tip-box">
                  <router-link
                    class="self"
                    :to="`/user/${userInfo.usernumber}`"
                    >{{ userInfo.name }}</router-link
                  >

                  <span class="txt margin">回复</span>

                  <router-link
                    class="txt"
                    :to="`/user/${commentReplyTip.usernumber}`"
                  >
                    {{ commentReplyTip.author.name }}
                  </router-link>
                </div>
              </div>
              <div class="content-box">
                <ReplyArea @onSubmit="submitReply" v-model="inputVal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { dateFormat } from "@/utils/index";
import { addLike } from "@/api/content";
import ReplyArea from "@/components/ReplyArea.vue";

@Component({
  components: { ReplyArea }
})
export default class CommentItem extends Vue {
  @Prop({ default: () => ({}) }) private commentObj!: any;
  // 当前展示的二级评论回复框的评论Id
  @Prop({ default: () => null }) private secondReplyShowId!: any;
  private dateFormat = dateFormat;
  // 输入框内容
  private inputVal = "";
  // 二级评论 @对象信息
  private commentReplyTip: any = {
    author: {
      name: "加载中...",
      usernumber: "whoops"
    }
  };
  // 当前的回复对象是否 为 2级评论对象
  private secondLevelCommentId = "";

  // 子评论列表
  private get children() {
    return this.commentObj.children;
  }

  // 作者信息
  private get author() {
    return this.commentObj.author;
  }

  // 个人信息
  private get userInfo() {
    return this.$store.state.userInfo;
  }

  // 点击一级&二级评论的 评论回复按钮
  private secondReplyShow(
    commentInfo: any,
    secondLevelCommentId: string | undefined
  ) {
    // 修改当前展示的输入框
    this.$emit("update:secondReplyShowId", this.commentObj.commentId);

    // 获取当前 @的人的信息
    this.commentReplyTip = commentInfo;

    // 判断当前的回复对象是否为 2级评论
    this.secondLevelCommentId = secondLevelCommentId || "";
  }

  // 提交评论
  private submitReply() {
    const payload: any = {
      replyId: this.commentReplyTip.author.usernumber,
      content: this.inputVal,
      commentId: this.commentObj.commentId,
      commentItem: this,
      secondLevelCommentId: this.secondLevelCommentId
    };

    this.$emit("secondReply", payload);
  }

  // 评论成功回调函数
  private successCallBack() {
    this.inputVal = "";
    // 如果评论对象为 2级评论， 则在评论完成后将该评论在页面上的commentCount++
    if (this.secondLevelCommentId) {
      this.commentReplyTip.commentCount += 1;
    }
  }

  // 点赞评论
  private async likeComment(comment: any) {
    const { commentId } = comment;

    const res = await addLike(commentId, 1);

    if (typeof res === "object") {
      this.$Message.success("点赞成功");
      comment.likeCount++;
      comment.isLiked = 1;
    } else {
      this.$Message.info(res);
      comment.likeCount--;
      comment.isLiked = 0;
    }
  }
}
</script>

<style lang="scss">
.comment-item-outermost {
  .comment-list {
    margin-bottom: 8px;
    width: 100%;
    padding: 10px 20px 4px 20px;
    background: #fff;

    .comment-content-box {
      padding-left: 54px;

      .comment-replyer {
        margin: 20px 0 30px;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          height: 200%;
          width: 200%;
          border: 2px solid #e5e5e5;
          z-index: 1;
        }

        .reply-box {
          padding: 16px;
          background: #fff;

          .wrap {
            position: relative;
            z-index: 5;

            .title-box {
              display: flex;
              align-items: center;
              font-size: 14px;

              .header-box {
                margin-right: 14px;
              }

              .tip-box {
                .self {
                  color: #292525;
                  &:hover {
                    color: $primaryColor;
                  }
                }

                .txt {
                  color: $contentColor;
                }

                .margin {
                  margin: 0 8px;
                }
              }
            }

            .content-box {
              position: relative;
              padding-left: 54px;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .comment-container {
      padding: 10px 0;

      .comment-user {
        display: flex;
        align-items: center;

        .header-box {
          width: 40px;
          height: 40px;
          margin-right: 14px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
          }
        }

        .user-box {
          overflow: hidden;
          flex: 1;

          .name {
            display: flex;
            align-items: flex-start;

            .user-link {
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 5px;
              color: #292525;

              &:hover {
                color: $primaryColor;
              }
            }

            .decoration {
              margin-left: 15px;
              color: $contentColor;
            }
          }

          .timer {
            color: #8e8787;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .comment-content {
        margin-bottom: 10px;

        .comment-txt {
          margin-top: 8px;
          line-height: 1.4;
          font-size: 16px;
          color: #4c4e4d;
          word-wrap: break-word;
        }

        .oper-box {
          display: flex;
          margin-top: 16px;
          min-height: 20px;

          .oper-item {
            cursor: pointer;
            display: flex;
            align-items: center;
            color: $contentColor;
            margin-right: 16px;

            span {
              margin-left: 5px;
            }
          }

          .commentLiked {
            color: $primaryColor;
          }
        }
      }
    }
  }
}
</style>
