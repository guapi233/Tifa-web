<template>
  <div class="comment-outermost">
    <div class="comment-box">
      <div class="comment">
        <!-- 头部 -->
        <div class="comment-header">
          <div class="comment-title">
            全部评论（{{ showLocalCommentCount }}）
          </div>
          <div class="review-box" @click="changeSort">
            <span v-if="commentSort === 'likeCount'">热门排序</span>
            <span v-if="commentSort === 'created'">时间排序</span>
            <Icon type="ios-funnel-outline" size="14" />
          </div>
        </div>
        <!-- 回复框 -->
        <div class="comment-reply">
          <CommentReply
            :userInfo="userInfo"
            :inputVal.sync="inputVal"
            :replyShow.sync="replyShow"
            @onSubmit="submitComment"
          />
        </div>

        <!-- 评论列表 -->
        <div class="comment-list-box">
          <CommentItem
            v-for="commentObj in commentList"
            :key="commentObj.commentId"
            :commentObj="commentObj"
          />
        </div>
        <!-- 加载更多评论 -->
        <div class="load-more-comment">
          更多
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CommentItem from "@/components/CommentItem.vue";
import CommentReply from "@/components/CommentReply.vue";
import { countFormat } from "@/utils/index";
import { addComment } from "@/api/content";

@Component({
  components: {
    CommentItem,
    CommentReply
  }
})
export default class Comment extends Vue {
  @Prop({ default: () => [] }) private commentList!: any;
  @Prop({ default: 0 }) private commentCount!: number;
  @Prop({ default: "" }) private targetId!: string;
  @Prop({ default: "likeCount" }) private commentSort!: string;

  // 输入框内容 & 输入框展示变量
  private inputVal = "";
  private replyShow = false;
  // countFormat
  private countFormat = countFormat;
  // 组件内部使用的评论数量，用于 评论成功时 完成展示效果 +1
  private localCommentCount = this.commentCount;

  // 展示用的 组件内部的文章评论数量
  private get showLocalCommentCount() {
    return countFormat(this.localCommentCount);
  }
  // 用户信息
  private get userInfo() {
    return this.$store.state.userInfo;
  }

  // 添加评论
  private async submitComment() {
    const res = await addComment({
      targetId: this.targetId,
      replyId: "*",
      content: this.inputVal,
      type: 0
    });

    if (res) {
      this.commentList.unshift(res);
      this.$Message.success("评论成功");

      // 关闭输入框 & 清空输入内容 & 评论展示数量 +1
      this.replyShow = false;
      this.inputVal = "";
      this.localCommentCount++;
    }
  }

  // 切换评论展示方式
  private changeSort() {
    const sort = this.commentSort === "created" ? "likeCount" : "created";
    this.$emit("update:commentSort", sort);

    // 将评论列表清空， 并对父组件触发 changeSort 事件
    this.$emit("update:commentList", []);
    this.$emit("changeSort");
  }
}
</script>

<style lang="scss">
.comment-box {
  .comment {
    width: 100%;
    max-width: 644px;
    margin: 0 auto;
    margin-top: 40px;

    .comment-header {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.06em;
      color: #655e5e;
      text-align: center;
      position: relative;

      .review-box {
        position: absolute;
        font-size: 14px;
        right: 0;
        top: 0;
        color: #8e8787;
        cursor: pointer;
        user-select: none;

        i {
          margin-left: 3px;
        }
      }
    }

    .comment-reply {
      margin-top: 30px;
      padding: 16px;
      background: #fff;
    }

    .comment-list-box {
      margin-top: 8px;
    }

    .load-more-comment {
      text-align: center;
      background: #fff;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      color: #655e5e;
    }
  }
}
</style>
