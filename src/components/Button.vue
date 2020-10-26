<template>
  <div>
    <button @click="beOne('3')">
      <slot>嘻嘻</slot>
    </button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
  Emit,
  Inject,
  InjectReactive
} from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Inject() private info!: string;
  @InjectReactive() private infoR!: string;

  @Emit("click")
  private beOne(str: string) {
    return new Promise((resolve, reject) => {
      console.log(this.info, this.infoR);
      resolve(1);
    });
  }
}
</script>

<style lang="scss" scope></style>
