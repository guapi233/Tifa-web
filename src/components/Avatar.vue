<template>
  <div class="avatar-outermost" v-on="$listeners">
    <router-link :to="to" v-if="to">
      <IAvatar :size="size" :icon="icon" :style="ustyle" :src="userPic">
        <slot />
      </IAvatar>
    </router-link>
    <IAvatar :size="size" :icon="icon" :style="ustyle" :src="userPic" v-else>
      <slot />
    </IAvatar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import config from "@/config";

@Component
export default class Avatar extends Vue {
  @Prop({ default: "" }) private to!: string | object;
  @Prop({ default: "ios-person" }) private icon!: string;
  @Prop({ default: "" }) private src!: string;
  @Prop({ default: "" }) private ustyle!: string;
  @Prop({ default: 36 }) private size!: string | number;

  private get userPic() {
    if (this.src && this.src.startsWith("/")) {
      return config.baseUrl + this.src;
    } else {
      return this.src;
    }
  }
}
</script>

<style lang="scss">
.avatar-outermost {
  display: inline-block;
  line-height: 1;
}
</style>
