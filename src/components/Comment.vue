<template>
  <div class="comment-outermost">
    <div class="comment-box">
      <div class="comment">
        <!-- 头部 -->
        <div class="comment-header">
          <div class="comment-title">全部评论（{{ commentCount }}）</div>
          <div class="review-box">
            <span>热门排序</span>
            <Icon type="ios-funnel-outline" size="14" />
          </div>
        </div>
        <!-- 回复框 -->
        <div class="comment-reply">
          <CommentReply :userInfo="userInfo" />
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

@Component({
  components: {
    CommentItem,
    CommentReply
  }
})
export default class Comment extends Vue {
  @Prop({ default: () => [] }) private commentList!: any;
  @Prop({ default: 0 }) private __commentCount!: number;

  private get userInfo() {
    return this.$store.state.userInfo;
  }
  private get commentCount() {
    return countFormat(this.__commentCount);
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
