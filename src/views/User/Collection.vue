<template>
  <div class="user-collection-outermost">
    <div class="container">
      <ArticleItem2
        class="item"
        v-for="item in collectionList"
        :key="item.collectionId"
        :itemObj="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCollectionList } from "@/api/content";
import ArticleItem2 from "@/components/ArticleItem2.vue";

@Component({
  components: { ArticleItem2 }
})
export default class UserCollection extends Vue {
  private collectionList: any = [];

  private created() {
    this.getCollectionList();
  }

  private async getCollectionList() {
    const { usernumber } = this.$route.params;
    const res: any = await getCollectionList(usernumber);

    if (res) {
      this.collectionList.push(...res);
    }
  }
}
</script>

<style lang="scss">
.user-collection-outermost {
  .container {
    padding: 16px 0;

    .item {
      margin: 16px 0;
    }
  }
}
</style>
