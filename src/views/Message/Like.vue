<template>
  <div class="message-like-outermost">
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
export default class MessageLike extends Vue {}
</script>

<style lang="scss">
.message-like-outermost {
  height: 100%;
}
</style>
