<template>
  <div class="user-update-outermost">
    <div class="user-updates">
      <div class="container" v-if="trendVisible">
        <UpdateItem v-for="trend in trendList" :key="trend.trendId" :trend="trend" />
      </div>
      <p class="unvisible-tip" v-else>该用户隐藏了自身的动态</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { addGlobalScroll, delGlobalEvent } from "@/utils/index";
import { getTrendList } from "@/api/public";
import UpdateItem from "./UpdateItem.vue";

let _scrollCb: any = null;

@Component({
  components: {
    UpdateItem
  },
})
export default class UserUpdate extends Vue {
  @Prop({ default: () => ({}) }) userInfo!: any;
  @Prop({ default: "" }) usernumber!: string;
  private trendList: any = [];
  private skip = 0;

  private get trendVisible() {
    return !(
      !this.userInfo.trendVisible &&
      this.usernumber !== this.$store.state.userInfo.usernumber
    );
  }

  // 入口
  private created() {
    this.getTrendList();

    // 绑定事件
    _scrollCb = addGlobalScroll("bottom", this.getTrendList);
  }
  private beforeDestory() {
    // 解绑
    delGlobalEvent("scroll", _scrollCb);
  }

  private async getTrendList() {
    const res: any = await getTrendList(this.usernumber, this.skip++);

    this.trendList.push(...res);

    if (!res.length) document.removeEventListener("scroll", _scrollCb);
  }
}
</script>

<style lang="scss">
.user-update-outermost {
  .user-updates {
    max-width: 800px;
    width: 100%;
    .container {
      padding: 16px 0;
    }
  }
}

@media screen and (max-width: 800px) {
  .update-item {
    width: 100vw;
    margin-top: 22px;
    padding: 0 10px;
  }
}
</style>
