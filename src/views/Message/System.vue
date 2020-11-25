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
import { getUnReadSystemMesList } from "@/api/content";

@Component({
  components: { SystemItem },
})
export default class MessageSystem extends Vue {
  private systemMesList = [];

  private created() {
    this.getUnReadSystemMesList();
  }

  private async getUnReadSystemMesList() {
    const res: any = await getUnReadSystemMesList();

    this.systemMesList = res;
  }
}
</script>

<style lang="scss">
.message-system-outermost {
  height: 100%;
  overflow: auto;
}
</style>
