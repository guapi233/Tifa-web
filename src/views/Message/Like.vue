<template>
  <div class="message-like-outermost">
    <div class="total">
      <div class="wrap" v-for="likeObj in likeList" :key="likeObj.likeId">
        <MessageItem :msgObj="likeObj" :type="0" />
      </div>
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

  private created() {
    this.getUnReadLikeList();
  }

  private async getUnReadLikeList() {
    const res = await getUnReadLikeList();

    this.likeList = res;
  }
}
</script>

<style lang="scss">
.message-like-outermost {
  height: 100%;
}
</style>
