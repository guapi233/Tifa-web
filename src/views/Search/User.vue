<template>
  <div class="search-user-outermost">
    <div class="search-user-container">
      <Lfrp>
        <template #left>
          <div class="left">
            <p class="noop-tip" v-if="!userList.length">空空如也~</p>
            <div
              class="user-item"
              v-for="itemObj in userList"
              :key="itemObj.usernumber"
            >
              <UserItem :item="itemObj" />
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
import UserItem from "@/components/UserItem";
import Lfrp from "@/layout/Lfrp.vue";

@Component({
  components: { Lfrp, UserItem },
})
export default class SearchUser extends Vue {
  @Prop({ default: "" }) private keyword!: string;
  private userList: any = [];
  private skip = 0;

  private created() {
    this.getUserList();
  }

  private async getUserList() {
    const { keyword } = this;
    if (!keyword) return;
    const res: any = await search(keyword, "user");

    this.dyeRed(res);
    this.userList.push(...res);
  }

  // 加红处理
  private dyeRed(list: any) {
    let keyword = this.keyword;
    keyword = keyword.split(/\s+/).join("|");

    list.forEach((item: any) => {
      // 适当声明一些冗余的变量，可以上指令变得更易读
      const name = item.name,
        reg = new RegExp(keyword, "ig"),
        dyed = `<strong>$&</strong>`;
      item.name = name.replace(reg, dyed);
    });
  }
}
</script>

<style lang="scss">
.search-user-outermost {
  .left {
    display: flex;
    flex-wrap: wrap;

    .user-item {
      margin: 10px 0;
    }
  }
}
</style>
