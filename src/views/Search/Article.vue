<template>
  <div class="search-article-outermost">
    <div class="search-article-container">
      <Lfrp>
        <template #left>
          <div class="left">
            <p class="noop-tip" v-if="!articleList.length">空空如也~</p>
            <div
              class="article-item"
              v-for="itemObj in articleList"
              :key="itemObj.articleId"
            >
              <ArticleItem2 :itemObj="itemObj" />
            </div>
          </div>
        </template>
        <template #right>
          <div class="right">热门推荐...</div>
        </template>
      </Lfrp>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { search } from "@/api/public";
import ArticleItem2 from "@/components/ArticleItem2.vue";
import Lfrp from "@/layout/Lfrp.vue";

@Component({
  components: { Lfrp, ArticleItem2 },
})
export default class SearchArticle extends Vue {
  @Prop({ default: "" }) private keyword!: string;
  private articleList: any = [];
  private skip = 0;

  private created() {
    this.getArticleList();
  }

  private async getArticleList() {
    const { keyword } = this;
    if (!keyword) return;
    const res: any = await search(keyword, "article");

    // 给选中的字体上色 & 放入列表
    this.dyeRed(res);
    this.articleList.push(...res);
  }

  // 加红处理
  private dyeRed(list: any) {
    let keyword = this.keyword;
    keyword = keyword.split(/\s+/).join("|");

    list.forEach((item: any) => {
      // 适当声明一些冗余的变量，可以上指令变得更易读
      const title = item.title,
        reg = new RegExp(keyword, "ig"),
        dyed = `<strong>$&</strong>`;
      item.title = title.replace(reg, dyed);
    });
  }
}
</script>

<style lang="scss">
.search-article-outermost {
  .article-item {
    margin: 10px 0;
  }
}
</style>
