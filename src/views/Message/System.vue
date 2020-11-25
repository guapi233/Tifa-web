<template>
  <div class="message-system-outermost">
    <Scroll :onReachBottom="getSystemMesList" :isEnd="isEnd">
      <div class="wrap" v-for="msgObj in systemMesList" :key="msgObj.systemId">
        <SystemItem :msgObj="msgObj" />
      </div>
    </Scroll>
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
  // 控制变量
  private skip = 0;
  private isEnd = false;

  private created() {
    this.getSystemMesList();
  }

  private async getSystemMesList() {
    const res: any = await getSystemMesList(this.skip++);

    this.systemMesList.push(...res);

    // 如果没数据了
    if (!res[0]) {
      this.isEnd = true;
    }

    // 设置已读
    !this.skip && this.setIsRead();
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
}
</style>
