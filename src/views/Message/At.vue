<template>
  <div class="message-at-outermost">
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
export default class MessageAt extends Vue {}
</script>

<style lang="scss">
.message-at-outermost {
  height: 100%;
}
</style>
