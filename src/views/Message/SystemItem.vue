<template>
  <div class="messgae-system-item-outermost">
    <div class="top">
      <span class="system-title"
        >今晚18:00「B站国创动画发布会」直播即将开启！</span
      >
      <span class="system-time">17:30</span>
    </div>
    <div class="bottom">
      凡人修仙传、定海浮生录、银河之心、恰同学少年等三十余部动画作品最新情报大公开！还有黄龄等嘉宾带来的精彩表演。快来锁定“哔哩哔哩国创”直播间。看直播，抽惊喜好礼>>
      网页链接 追番戳>> 网页链接
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SystemItem extends Vue {}
</script>

<style lang="scss">
.messgae-system-item-outermost {
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
  margin-bottom: 10px;
  border-radius: 5px;

  .top {
    margin-bottom: 5px;

    .system-title {
      color: #333;
      font-weight: 700;
    }

    .system-time {
      color: $contentColor;
    }
  }

  .bottom {
    padding-left: 8px;
    color: #666;
  }
}
</style>
