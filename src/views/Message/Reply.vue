<template>
  <div class="message-reply-outermost">
    <div class="last"></div>
    <div class="total">
      <div class="wrap" v-for="i in 20" :key="i">
        <MessageItem />
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageItem from "./MessageItem.vue";

@Component({
  components: { MessageItem },
})
export default class MessageReply extends Vue {}
</script>

<style lang="scss">
.message-reply-outermost {
  height: 100%;

  .last {
  }

  .total {
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
    padding: 24px 16px;
    overflow: auto;

    .divider {
      width: calc(100% - 44px);
      height: 1px;
      border-bottom: 1px solid #e5e9ef;
      position: relative;
      left: 60px;
    }
  }

  .wrap {
    &:first-child {
      .item {
        padding-top: 0;
      }
    }
  }
}
</style>
