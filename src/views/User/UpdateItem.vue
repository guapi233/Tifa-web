<template>
  <div class="update-item-outermost">
    <div class="updates">
      <div class="update-item">
      <UpdateItemTitle />
        <ArticleItem2 :itemObj="{
          title: '哈哈',
          articleId: 2,
          likeCount: 10,
          commentCount: 10,
          author: {
            usernumber: '17692711124',
            name: '崔永杰'
          }
        }" />
      </div>

      <div class="update-item">
       <UpdateItemTitle />
        <div class="update-cont">
          <div class="comment-box">
            <Icon type="ios-quote" size="28" />
            <div class="comment-content">
              <div class="txt">开不开步，hhh</div>
              <div class="article-title">
                原文：<router-link to="/article"
                  >《本周看什么 | 近期值得一看的 8 部作品》</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import{Component,Vue}from 'vue-property-decorator';
import ArticleItem2 from "@/components/ArticleItem2.vue";
import UpdateItemTitle from "./UpdateItemTitle.vue";

@Component({
  components: { ArticleItem2, UpdateItemTitle }
})
export default class UpdateItem extends Vue{

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
