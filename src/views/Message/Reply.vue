<template>
  <div class="message-reply-outermost">
    <div class="last"></div>
    <div class="total">
      <div
        class="wrap"
        v-for="commentObj in commentList"
        :key="commentObj.commentId"
      >
        <MessageItem :msgObj="commentObj" :type="1" replyBox likeBox />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageItem from "./MessageItem.vue";
import { getUnReadCommentList } from "@/api/content";

@Component({
  components: { MessageItem },
})
export default class MessageReply extends Vue {
  private commentList = [];

  private created() {
    this.getUnReadCommentList();
  }

  private async getUnReadCommentList() {
    const res: any = await getUnReadCommentList();

    if (res) {
      this.commentList = res;
    }
  }
}
</script>

<style lang="scss">
.message-reply-outermost {
  height: 100%;
}
</style>
