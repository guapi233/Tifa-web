<template>
  <div class="user-article-outermost">
    <div class="article-box">
      <div class="container">
        <div
          class="article-item"
          v-for="item in articleList"
          :key="item.articleId"
        >
          <ArticleItem2 class="item" :itemObj="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getArticleList } from "@/api/content";
import ArticleItem2 from "@/components/ArticleItem2.vue";

@Component({
  components: { ArticleItem2 },
})
export default class UserArticle extends Vue {
  @Prop({ default: "" }) private usernumber!: string;
  private articleList: any = [];

  private created() {
    this.getArticleList();
  }

  private async getArticleList() {
    const { usernumber } = this;
    const res: any = await getArticleList({ usernumber });

    if (res) {
      this.articleList.push(...res);
    }
  }
}
</script>

<style lang="scss">
.user-article-outermost {
  .article-box {
    .article-item {
      margin: 16px 0;
    }
  }
}

@media screen and (max-width: 800px) {
  .user-article-outermost {
    .article-box {
      .article-item {
        padding: 0 10px;
      }
    }
  }
}
</style>
