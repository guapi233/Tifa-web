<template>
  <div class="user-follow-outermost">
    <div class="tab-box">
      <div class="tab-item" :class="{ active: !type }" @click="getList(0)">
        关注
      </div>
      <div class="tab-item" :class="{ active: type }" @click="getList(1)">
        粉丝
      </div>
    </div>
    <div class="user-follow-box">
      <div class="content">
        <div class="user">
          <UserItem v-for="item in cardList" :key="item.followId" :item="item" @follow="followUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getFollowList, getFollowedList } from "@/api/content";
import { followUser } from "@/api/user";
import UserItem from "@/components/UserItem";

@Component({
  components: { UserItem }
})
export default class UserFollow extends Vue {
  @Prop({ default: "" }) private usernumber!: string;
  private type = 0;
  private authorId = "";
  private cardList: any = [];
  private skip = 0;

  private created() {
    this.authorId = this.usernumber;
    this.getList();
  }

  private async getFollowList() {
    const { usernumber } = this.$store.state.userInfo;
    const res = await getFollowList(this.authorId, usernumber, this.skip++);

    if (!res) {
      return [];
    }
    return res;
  }

  private async getFollowedList() {
    const { usernumber } = this.$store.state.userInfo;
    const res = await getFollowedList(this.authorId, usernumber, this.skip++);

    if (!res) {
      return [];
    }
    return res;
  }

  private async getList(change = -1) {
    // 清空数组 & 回到第一页 & 清空列表
    if (change !== -1) {
      this.type = change;
      this.cardList = [];
      this.skip = 0;
    }

    let res: any = [];
    if (this.type) {
      res = await this.getFollowedList();
    } else {
      res = await this.getFollowList();
    }
    this.cardList.push(...res);
  }

  private async handleReachBottom() {
    console.log("??");
  }

  // 关注
  private async followUser(target: any) {
    let res: any = null;

    // 判断当前类型， 如果是我关注的，那要传我关注的对象，否则传authorId，关注我的
    if (!this.type) {
      res = await followUser(target.targetId);
    } else {
      res = await followUser(target.authorId);
    }

    if (typeof res === "object") {
      this.$Message.success("关注成功");
      target.isFollowed = 1;
    } else if (typeof res === "string") {
      this.$Message.info(res);
      target.isFollowed = 0;
    }
  }
}
</script>

<style lang="scss">
.user-follow-outermost {
  .tab-box {
    padding: 20px 12px 20px;
    width: 100%;
    max-width: 800px;
    text-align: right;
    user-select: none;

    .tab-item {
      display: inline-block;
      margin-left: 30px;
      font-size: 14px;
      line-height: 20px;
      color: #8e8787;
      cursor: pointer;
    }

    .active {
      color: $primaryColor;
      font-weight: bold;
    }
  }

  .user-follow-box {
    .content {
      width: 100%;
      max-width: 822px;
      position: relative;
      display: flex;

      .user {
        flex: 1;
        width: 100%;
        max-width: 822px;
        margin: -10px -9.5px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
