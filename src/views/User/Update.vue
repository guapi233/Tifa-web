<template>
  <div class="user-update-outermost">
    <div class="user-updates">
      <div class="container" v-if="trendVisible">
        <UpdateItem />
      </div>
      <p class="unvisible-tip" v-else>该用户隐藏了自身的动态</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UpdateItem from "./UpdateItem.vue";

@Component({
  components: {
    UpdateItem
  },
})
export default class UserUpdate extends Vue {
  @Prop({ default: () => ({}) }) userInfo!: any;
  @Prop({ default: "" }) usernumber!: string;

  private get trendVisible() {
    return !(
      !this.userInfo.trendVisible &&
      this.usernumber !== this.$store.state.userInfo.usernumber
    );
  }
}
</script>

<style lang="scss">
.user-update-outermost {
  .user-updates {
    max-width: 800px;
    width: 100%;
    .container {
      padding: 16px 0;
    }
  }
}

@media screen and (max-width: 800px) {
  .update-item {
    width: 100vw;
    margin-top: 22px;
    padding: 0 10px;
  }
}
</style>
