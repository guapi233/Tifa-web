<template>
  <div class="update-item-title-outermost">
    <div class="title-box">
      <div class="left">
        <div class="title">
          <Avatar to="/user" size="24" />
          <div class="name">Mob233</div>
        </div>
        <div class="memo">喜欢了文章</div>
      </div>
      <div class="time">3小时前</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }from 'vue-property-decorator';

@Component
export default class UpdateItemTitle extends Vue{

}
</script>

<style lang="scss">
.update-item-title-outermost {
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 8px;

    .left {
      display: flex;
      align-items: center;
      .title {
        .name {
          display: inline-block;
          color: #292525;
          margin: 0 14px 0 10px;
        }
      }
      .memo {
        line-height: 32px;
      }
    }
  }
}
</style>
