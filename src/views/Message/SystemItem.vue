<template>
  <div class="messgae-system-item-outermost">
    <div class="top">
      <span class="system-title">{{ msgObj.title }}</span>
      <span class="system-time">{{ dateFormat(msgObj.created) }}</span>
    </div>
    <div class="bottom" v-html="msgObj.content"></div>

    <div class="new-box" title="最新的通知" v-if="msgObj.isNew">NEW</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { dateFormat } from "@/utils/index";

@Component
export default class SystemItem extends Vue {
  @Prop({ default: () => ({}) }) private msgObj!: any;
  private dateFormat = dateFormat;
}
</script>

<style lang="scss">
.messgae-system-item-outermost {
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;

  .new-box {
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    padding: 5;
    cursor: pointer;
  }

  .top {
    margin-bottom: 5px;

    .system-title {
      color: #333;
      font-weight: 700;
      margin-right: 8px;
    }

    .system-time {
      color: $contentColor;
    }
  }

  .bottom {
    padding-left: 8px;
    color: #666;

    a {
      color: $primaryColor;
    }
  }
}
</style>
