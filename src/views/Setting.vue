<template>
  <div class="setting-outermost">
    设置页
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Setting extends Vue {}
</script>

<style lang="scss">
.setting-outermost {
  min-height: 777px;
  background-color: #f5f7f9;
}
</style>
