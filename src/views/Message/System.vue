<template>
  <div class="message-system-outermost">
    <div class="wrap" v-for="i in 20" :key="i">
      <SystemItem />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SystemItem from "./SystemItem.vue";

@Component({
  components: { SystemItem },
})
export default class MessageSystem extends Vue {}
</script>

<style lang="scss">
.message-system-outermost {
  height: 100%;
  overflow: auto;
}
</style>
