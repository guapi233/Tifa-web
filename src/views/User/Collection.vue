<template>
  <div class="user-collection-outermost" v-if="userInfo.usernumber">
    <div class="container" v-if="collectionVisible">
      <ArticleItem2
        class="item"
        v-for="item in collectionList"
        :key="item.collectionId"
        :itemObj="item.article"
      />
    </div>
    <p class="unvisible-tip" v-else>该用户隐藏了自己的收藏列表</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getCollectionList } from "@/api/content";
import ArticleItem2 from "@/components/ArticleItem2.vue";

@Component({
  components: { ArticleItem2 },
})
export default class UserCollection extends Vue {
  @Prop({ default: () => ({}) }) userInfo!: any;
  @Prop({ default: "" }) usernumber!: string;
  private collectionList: any = [];

  private created() {
    this.getCollectionList();
  }

  private get collectionVisible() {
    return !(
      !this.userInfo.collectionVisible &&
      this.usernumber !== this.$store.state.userInfo.usernumber
    );
  }

  private async getCollectionList() {
    if (!this.collectionVisible) return;
    const { usernumber } = this;
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
