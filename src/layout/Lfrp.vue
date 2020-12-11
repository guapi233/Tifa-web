<template>
  <div class="left-flex-right-px-outermost">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right" :style="{ width: rightSize }">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Lfrp extends Vue {
  @Prop({ default: "252px" }) private rightSize!: string;
}
</script>

<style lang="scss">
.left-flex-right-px-outermost {
  display: flex;

  .left {
    flex: 1;
  }
}
</style>
