<template>
  <div class="message-like-outermost">
    <div class="total">
      <p v-if="!likeList.length">并没有数据哦~</p>

      <Scroll v-else :onReachBottom="getUnReadLikeList" :isEnd="isEnd">
        <div class="wrap" v-for="likeObj in likeList" :key="likeObj.likeId">
          <MessageItem :msgObj="likeObj" :type="0" />
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageItem from "./MessageItem.vue";
import { getUnReadLikeList } from "@/api/content";

@Component({
  components: { MessageItem },
})
export default class MessageLike extends Vue {
  private likeList: any = [];
  private skip = 0;
  private isEnd = false;

  private created() {
    this.getUnReadLikeList();
  }

  private async getUnReadLikeList() {
    const res: any = await getUnReadLikeList(this.skip++);

    this.likeList.push(...res);

    if (!res[0]) {
      this.isEnd = true;
    }
  }
}
</script>

<style lang="scss">
.message-like-outermost {
  height: 100%;
}
</style>
