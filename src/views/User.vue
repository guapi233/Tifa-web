<template>
  <div class="user-outermost">
    user
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class User extends Vue {}
</script>

<style lang="scss">
.user-outermost {
  min-height: 777px;
  background-color: #f5f7f9;
}
</style>
