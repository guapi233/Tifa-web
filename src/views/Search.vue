<template>
  <div class="search-outermost">
    <div class="search-top">
      <div class="searcher">
        <Input long class="reset-search-input" />
      </div>
      <div class="search-tabs">
        <Tabs :tabList="tabList" />
      </div>
    </div>
    <div class="search-container">
      <div class="content-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Tabs },
})
export default class Search extends Vue {
  private tabList = [
    {
      to: "/search/article",
      name: "文章",
    },
    {
      to: "/search/user",
      name: "用户",
    },
  ];
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
  }
}
</style>
