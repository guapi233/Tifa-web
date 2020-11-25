<template>
  <div class="message-system-outermost">
    <div class="wrap" v-for="msgObj in systemMesList" :key="msgObj.systemId">
      <SystemItem :msgObj="msgObj" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SystemItem from "./SystemItem.vue";
import { getSystemMesList } from "@/api/content";
import { setIsRead } from "@/api/content";

@Component({
  components: { SystemItem },
})
export default class MessageSystem extends Vue {
  private systemMesList: any = [];

  private created() {
    this.getSystemMesList();
  }

  private async getSystemMesList() {
    const res: any = await getSystemMesList();

    this.systemMesList = res;

    // 设置已读
    this.setIsRead();
  }

  // 设置已读
  private async setIsRead() {
    if (!this.systemMesList[0]) return;

    await setIsRead(3, this.systemMesList[0].systemId);
  }
}
</script>

<style lang="scss">
.message-system-outermost {
  height: 100%;
  overflow: auto;
}
</style>
