<template>
  <div class="message-at-outermost">
    <div class="total">
      <p v-if="!followList.length">并没有数据哦~</p>

      <Scroll v-else :onReachBottom="getUnReadFollowList" :isEnd="isEnd">
        <div
          class="wrap"
          v-for="followObj in followList"
          :key="followObj.followId"
        >
          <MessageItem :msgObj="followObj" :type="2" />
          <div class="divider"></div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageItem from "./MessageItem.vue";
import { getUnReadFollowList } from "@/api/content";

@Component({
  components: { MessageItem },
})
export default class MessageAt extends Vue {
  private followList: any = [];
  private skip = 0;
  private isEnd = false;

  private created() {
    this.getUnReadFollowList();
  }

  private async getUnReadFollowList() {
    const res: any = await getUnReadFollowList(this.skip++);

    this.followList.push(...res);

    // 到底
    if (!res[0]) {
      this.isEnd = true;
    }
  }
}
</script>

<style lang="scss">
.message-at-outermost {
  height: 100%;
}
</style>
