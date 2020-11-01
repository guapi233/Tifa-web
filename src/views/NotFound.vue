<template>
  <div class="not-found-outermost">
    <div class="not-found-box">
      <div class="tip">404</div>
      <div class="tip-content">抱歉，您要查看的页面不存在或已被删除</div>
      <router-link to="/"><Button>回到首页</Button></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>

<style lang="scss">
.not-found-outermost {
  .not-found-box {
    margin: 200px auto;
    width: 400px;
    height: 100px;
    text-align: center;

    .tip {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .tip-content {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
}
</style>
