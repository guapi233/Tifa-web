<template>
  <div class="user-title-outermost">
    <img src="https://cdn.sspai.com/ui/badge/shaoshupaichengyuan.png" alt="" />
    <span class="con-txt">MEMBER OF TIFA COMMUNITY</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserTitle extends Vue {}
</script>

<style lang="scss">
.user-title-outermost {
  color: #292525;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 12px;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
