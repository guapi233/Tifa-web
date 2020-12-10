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
      <Button shape="circle" type="primary" v-if="hasMore" @click="loadmore">
        加载更多
      </Button>
      <Button shape="circle" type="primary" disabled v-else>
        已经没有更多了哦
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleItem from "@/components/ArticleItem.vue";
import { getArticleList } from "@/api/content";

@Component({
  components: { ArticleItem },
})
export default class CommunityRecommend extends Vue {
  private articleList: any = [];
  private hasMore = true;
  private page = 0;

  private async created() {
    this.loadmore();
  }

  private async loadmore() {
    const { usernumber } = this.$store.state.userInfo;
    const res: any = await getArticleList({
      skip: this.page,
      self: usernumber,
    });

    if (res.length === 0) {
      this.hasMore = false;
    }

    this.articleList.push(...res);
    this.page++;
  }
}
</script>

<style lang="scss">
.community-recommend-outermost {
  .load-more {
    margin: 36px 0;
    text-align: center;
  }
}
</style>
