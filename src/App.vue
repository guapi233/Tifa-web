<template>
  <div id="app">
    <router-view v-if="routerLive" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private routerLive = true;

  // 重装组件
  @Provide()
  private reload() {
    this.routerLive = false;

    this.$nextTick(() => {
      this.routerLive = true;
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
