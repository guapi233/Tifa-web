<template>
  <div class="message-reply-outermost">
    <div class="total">
      <Scroll :onReachBottom="getUnReadCommentList" :isEnd="isEnd">
        <div
          class="wrap"
          v-for="commentObj in commentList"
          :key="commentObj.commentId"
        >
          <MessageItem :msgObj="commentObj" :type="1" replyBox likeBox />
        </div>
      </Scroll>
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
  private commentList: any = [];
  private skip = 0;
  private isEnd = false;

  private created() {
    this.getUnReadCommentList();
  }

  private async getUnReadCommentList() {
    const res: any = await getUnReadCommentList(this.skip++);
    this.commentList.push(...res);

    if (!res[0]) this.isEnd = true;
  }
}
</script>

<style lang="scss">
.message-reply-outermost {
  height: 100%;
}
</style>
