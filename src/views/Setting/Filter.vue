<template>
  <div class="setting-filter-outermost">
    <div class="blacklisted">
      <h2 class="title">屏蔽的用户</h2>
      <p class="none-tip" v-if="!blacklistedList.length">无用户</p>
      <div class="blacklisted-list" v-else>
        <Scroll :onReachBottom="getBlacklistedList" :isEnd="isEnd">
          <div
            class="blacklisted-item"
            v-for="item in blacklistedList"
            :key="item.usernumber"
          >
            <Avatar :size="36" :src="item.pic" />
            <p class="blacklisted-name">{{ item.name }}</p>

            <Poptip
              confirm
              placement="right"
              :title="`确定要${item.op ? '屏蔽用户' : '取消屏蔽'}吗？`"
              @on-ok="setBlacklisted(item)"
            >
              <Button>{{ item.op ? "屏蔽用户" : "取消屏蔽" }}</Button>
            </Poptip>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getBlacklistedList, setBlacklisted } from "@/api/user";

@Component
export default class SettingFilter extends Vue {
  private blacklistedList: any = [];
  private skip = 0;
  private isEnd = false;

  private mounted() {
    this.getBlacklistedList();
  }

  private async getBlacklistedList() {
    const res: any = await getBlacklistedList(this.skip++);

    if (res && res.length) {
      this.blacklistedList.push(...res);
    } else {
      this.isEnd = false;
    }
  }
  private async setBlacklisted(item: any) {
    const res: any = await setBlacklisted(item.usernumber);

    if (!res) return;

    this.$Message.success(res);
    if (typeof item.op === "undefined") {
      this.$set(item, "op", true);
    } else {
      item.op = !item.op;
    }
  }
}
</script>

<style lang="scss">
.setting-filter-outermost {
  .blacklisted {
    .blacklisted-list {
      height: 500px;

      .blacklisted-item {
        display: flex;
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(34, 51, 51, 0.103);

        .blacklisted-name {
          flex: 1;
          margin-left: 10px;
          font-size: 22px;
        }
      }
    }
  }
}
</style>
