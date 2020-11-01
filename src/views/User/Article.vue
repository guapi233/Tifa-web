<template>
  <div class="user-article-outermost">
    <div class="article-box">
      <div class="article-item">
        <ArticleItem2 />
      </div>
      <div class="article-item">
        <ArticleItem2 />
      </div>
      <div class="article-item">
        <ArticleItem2 />
      </div>
      <div class="article-item">
        <ArticleItem2 />
      </div>
      <div class="article-item">
        <ArticleItem2 />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleItem2 from "@/components/ArticleItem2.vue";

@Component({
  components: {
    ArticleItem2
  }
})
export default class UserArticle extends Vue {}
</script>

<style lang="scss">
.user-article-outermost {
  .article-box {
    .article-item {
      margin: 22px 0;
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
