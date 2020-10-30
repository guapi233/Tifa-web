<template>
  <div class="community-recommend-outermost">
    <div class="article-list">
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
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

@Component({
  components: { ArticleItem }
})
export default class ClassName extends Vue {}
</script>


<style lang="scss">
.community-recommend-outermost {
  .load-more {
    margin: 36px 0;
  }
}
</style>
