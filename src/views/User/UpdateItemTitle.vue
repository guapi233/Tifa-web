<template>
  <div class="update-item-title-outermost">
    <div class="title-box">
      <div class="left">
        <div class="title">
          <Avatar :to="`/user/${authorInfo.usernumber}`" size="24" :src="authorInfo.pic" />
          <div class="name">{{ authorInfo.name }}</div>
        </div>
        <div class="memo">{{ title }}</div>
      </div>
      <div class="time">{{ dateFormat(trend.created) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }from 'vue-property-decorator';
import { dateFormat } from "@/utils/index";

@Component
export default class UpdateItemTitle extends Vue{
  @Prop({ default: () => ({}) }) private trend!: any;
  private targetList = ["文章", "评论"]; // 评论目标列表
  private dateFormat = dateFormat;

  // 标题
  private get title() {
    const targetType = this.trend.data.type, target = this.targetList[targetType];
    const targetInfo = this.trend.data.targetInfo;

    switch (this.trend.type) {
      case 0:
        return "发布了文章";
      case 1:
        return "点赞了" + target;
      case 2:
        return (targetType === 1 ? "回复了" :"评论了") + ` ${targetInfo.name} 的`  + target;
      case 3:
        return "关注了作者";
      default: 
        return "";
    }
  }

  // 发动态的用户的用户信息
  private get authorInfo() {
    return this.trend.data.authorInfo;
  }
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
