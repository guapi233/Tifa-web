<template>
  <div class="message-at-outermost">
    <div class="total">
      <div
        class="wrap"
        v-for="followObj in followList"
        :key="followObj.followId"
      >
        <MessageItem :msgObj="followObj" :type="2" />
        <div class="divider"></div>
      </div>
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
  private followList = [];

  private created() {
    this.getUnReadFollowList();
  }

  private async getUnReadFollowList() {
    const res: any = await getUnReadFollowList();

    this.followList = res;
  }
}
</script>

<style lang="scss">
.message-at-outermost {
  height: 100%;
}
</style>
