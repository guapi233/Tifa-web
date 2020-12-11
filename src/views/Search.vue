<template>
  <div class="search-outermost">
    <div class="search-top">
      <div class="searcher">
        <Input
          v-model="keyword"
          long
          class="reset-search-input"
          @keydown.native.enter="reload"
        />
      </div>
      <div class="search-tabs">
        <Tabs :tabList="tabList" />
      </div>
    </div>
    <div class="search-container">
      <div class="content-container">
        <router-view v-if="contentLife" :keyword="keyword" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import { addSearch, search } from "@/api/public";

@Component({
  components: { Tabs },
})
export default class Search extends Vue {
  private keyword = "";
  private contentLife = true;
  private searchCount: any = {
    articles: 0,
    users: 0,
  };

  private get tabList() {
    const { articles, users } = this.searchCount;
    const str = this.keyword ? `?keyword=${this.keyword}` : "";

    return [
      {
        to: "/search/article" + str,
        name: "文章" + `(${articles})`,
      },
      {
        to: "/search/user?" + str,
        name: "用户" + `(${users})`,
      },
    ];
  }

  private created() {
    // 获取keyword
    const { keyword } = this.$route.query;
    this.keyword = (keyword as string) || "";

    // 初始化检索的数量
    this.getSearchCount();
  }

  private reload() {
    if (this.keyword === this.$route.query.keyword) return;
    const { to } = this.tabList[0],
      { name } = this.$route;

    // 初始化路由 & 如果路由不变，则reload组件状态 & reload检索数量
    this.$router.push(to);
    if (name === "SearchArticle") {
      this.contentLife = false;
      this.$nextTick(() => {
        this.contentLife = true;
      });
    }
    this.getSearchCount();

    // 添加检索记录到远端
    addSearch(this.keyword);
  }

  private async getSearchCount() {
    this.searchCount = await search(this.keyword, "count");
  }
}
</script>

<style lang="scss">
.search-outermost {
  .search-top {
    height: 145px;
    padding: 25px 10px 0;

    .searcher {
      max-width: 810px;
      height: 60px;
      margin: 0 auto;

      .reset-search-input {
        height: 100%;
        .ivu-input {
          height: 100%;
          font-size: 18px;
          background-color: #f5f5f5;

          &:focus {
            background-color: #fff;
          }
        }
      }
    }

    .search-tabs {
      max-width: 1140px;
      margin: 20px auto 0;
    }
  }

  .search-container {
    background-color: #f5f7f9;
    min-height: 663.5px;

    .content-container {
      width: 1120px;
      margin: 0 auto;
      padding-top: 40px;
    }

    .noop-tip {
      color: $contentColor;
      font-size: 18px;
    }

    strong {
      color: red;
      font-weight: bold;
    }
  }
}
</style>
