<template>
  <div class="user-update-outermost">
    <div class="user-updates">
      <div class="container" v-if="trendVisible && trendList.length">
        <UpdateItem
          v-for="trend in trendList"
          :key="trend.trendId"
          :trend="trend"
        />
      </div>
      <p class="noop-tip" v-else-if="trendVisible">动态空空~</p>
      <p class="unvisible-tip" v-else>该用户隐藏了自身的动态</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { addGlobalScroll, delGlobalEvent } from "@/utils/index";
import { getTrendList } from "@/api/public";
import UpdateItem from "./UpdateItem.vue";
import { getTrendListReturn } from "@/types/api/public";

let _scrollCb: any = null;

@Component({
  components: {
    UpdateItem,
  },
})
export default class UserUpdate extends Vue {
  @Prop({ default: () => ({}) }) private userInfo!: any;
  @Prop({ default: "" }) private usernumber!: string;
  @Prop({ default: "user" }) private type!: string;
  private trendList: getTrendListReturn | any[] = [];
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
  private beforeDestroy() {
    // 解绑
    delGlobalEvent("scroll", _scrollCb);
    _scrollCb = null;
  }

  private async getTrendList() {
    const type = this.type;
    const res =
      type === "follow"
        ? await getTrendList("", this.skip++)
        : await getTrendList(this.usernumber, this.skip++);

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
