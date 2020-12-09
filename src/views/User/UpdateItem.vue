<template>
  <div class="update-item-outermost">
    <div class="updates">
      <div class="update-item" v-if="type === 'article'">
        <UpdateItemTitle :trend="trend" />
          <ArticleItem2 :itemObj="trendData" />
      </div>

      <div class="update-item" v-else-if="type === 'comment'">
       <UpdateItemTitle :trend="trend" />
        <div class="update-cont">
          <div class="comment-box">
            <Icon type="ios-quote" size="28" />
            <div class="comment-content">
              <div class="txt" v-html="trendData.content"></div>
              <div class="article-title">
                原文：
                <router-link 
                  :to="`/article/${trendData.oper.articleId}`" 
                  v-html="commentContent" 
                  v-if="trendData.oper.articleId">
                </router-link>
                <span v-else v-html="commentContent"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="update-item" v-else-if="type === 'user'">
        <UpdateItemTitle :trend="trend" />
        <UserItem :item="trendData.targetInfo" @follow="followUser" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import{ Component, Vue, Prop }from 'vue-property-decorator';
import { followUser } from "@/api/user";
import ArticleItem2 from "@/components/ArticleItem2.vue";
import UpdateItemTitle from "./UpdateItemTitle.vue";
import UserItem from "@/components/UserItem";

@Component({
  components: { ArticleItem2, UpdateItemTitle, UserItem }
})
export default class UpdateItem extends Vue{
  @Prop({ default: () => ({}) }) private trend!: any;

  private get trendData() {
    return this.trend.data;
  }

  private get type() {
    const trendType = this.trend.type;
    if (trendType === 3) return "user";
    else if (trendType === 0) return "article";
    else {
      if (this.trendData.commentId) return "comment";
      else if (this.trendData.articleId) return "article";
    }

    return "";
  }

  // 评论的内容
  private get commentContent () {
    if (this.type !== "comment") return "";

    if (this.trendData.type === 0) {
      return `《${this.trendData.oper.title}》`;
    } else if (this.trendData.type === 1) {
      return `${this.trendData.oper.content}`;
    }

    return "";
  }

    // 关注
  private async followUser(target: any) {
    let res: any = null;
    res = await followUser(target.usernumber);

    if (typeof res === "object") {
      this.$Message.success("关注成功");
      target.isFollowed = 1;
    } else if (typeof res === "string") {
      this.$Message.info(res);
      target.isFollowed = 0;
    }
  }
}
</script>

<style lang="scss">
.update-item-outermost {
  .updates {
    .update-item {
      margin-bottom: 22px;
      color: $contentColor;

      .comment-box {
        padding: 30px;
        background: #fff;
        display: flex;

        i {
          margin-right: 30px;
        }

        .comment-content {
          flex: 1;
          word-wrap: break-word;

          .txt {
            font-size: 16px;
            color: #292525;
            width: 100%;
            max-width: 664px;
          }

          .article-title {
            color: #8e8787;
            font-size: 14px;
            margin-top: 12px;
          }

          a {
            color: #292525;

            &:hover {
              color: $primaryColor;
            }
          }

          .emoji-size-small {
            width: 24px;
            vertical-align: text-bottom;
          }
        }
      }

      .updates-pic {
        width: 24px;
        height: 24px;
        border-radius: 100%;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>
