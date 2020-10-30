<template>
  <div class="community-recommend-outermost">
    <div class="article-list">
      <ArticleItem
        v-for="article in articleList"
        :key="article.articleId"
        :articleObj="article"
      />
    </div>
    <div class="load-more">
      <Button shape="circle" type="primary">
        加载更多
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleItem from "@/components/ArticleItem.vue";
import { getArticleList } from "@/api/content";

@Component({
  components: { ArticleItem }
})
export default class ClassName extends Vue {
  private articleList = [];

  private async created() {
    const res = await getArticleList();

    this.articleList = res;
  }
}
</script>

<style lang="scss">
.community-recommend-outermost {
  .load-more {
    margin: 36px 0;
  }
}
</style>
