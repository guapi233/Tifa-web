<template>
  <div class="comment-item-outermost">
    <div class="comment-list">
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
              <div class="oper-item">
                <Icon type="md-text" size="20" />
                <span>{{ commentObj.commentCount }}</span>
              </div>
              <div class="oper-item">
                <Icon type="md-thumbs-up" size="20" />
                <span>{{ commentObj.likeCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <div class="oper-item">
                    <Icon type="md-text" size="20" />
                    <span>{{ child.commentCount }}</span>
                  </div>
                  <div class="oper-item">
                    <Icon type="md-thumbs-up" size="20" />
                    <span>{{ child.likeCount }}</span>
                  </div>
                </div>
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

@Component
export default class CommentItem extends Vue {
  @Prop({ default: () => ({}) }) private commentObj!: any;
  private dateFormat = dateFormat;

  // 子评论列表
  private get children() {
    return this.commentObj.children;
  }

  // 作者信息
  private get author() {
    return this.commentObj.author;
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
            align-items: center;

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
        }
      }
    }
  }
}
</style>
