<template>
  <div class="message-reply-outermost">
    <div class="last"></div>
    <div class="total">
      <div
        style="height: 100px; background-color: red"
        v-for="i in 20"
        :key="i"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
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
  }
}
</style>
