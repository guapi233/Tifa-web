<template>
  <div class="whisper-item-outermost">
    <div class="msg-time" v-if="createdShow">{{ dateFormat(created) }}</div>
    <div class="notify-wrapper" v-if="!status">
      <span>{{ content }}</span>
    </div>
    <!-- 我说的话 -->
    <div class="msg-item is-me" v-else-if="me && type === 0">
      <Avatar class="avatar" size="30" :src="avatar" />
      <div class="message" :data-contextmenu="whisperId" data-menuvalid="me">
        <div class="message-content not-img" v-html="content"></div>
      </div>
    </div>
    <!-- 对方说的话 -->
    <div class="msg-item not-me" v-else-if="type === 0">
      <Avatar class="avatar" size="30" :src="avatar" />
      <div class="message" :data-contextmenu="whisperId" data-menuvalid="oppo">
        <div class="message-content not-img" v-html="content">1</div>
      </div>
    </div>
    <!-- 我发的图 -->
    <div class="msg-item is-me" v-else-if="me && type === 1">
      <Avatar class="avatar" size="30" :src="avatar" />
      <div
        class="message img-pad"
        :data-contextmenu="whisperId"
        data-menuvalid="me"
      >
        <div class="message-content">
          <img :src="content" alt="" />
        </div>
      </div>
    </div>
    <!-- 对方发的图 -->
    <div class="msg-item not-me" v-else-if="type === 1">
      <Avatar class="avatar" size="30" :src="avatar" />
      <div
        class="message img-pad"
        :data-contextmenu="whisperId"
        data-menuvalid="oppo"
      >
        <div class="message-content">
          <img :src="content" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class WhisperItem extends Vue {
  @Prop({ default: false }) me!: boolean; // 是否是我发的消息
  @Prop({ default: 0 }) type!: number; // 消息的类型：0文本、1图片
  @Prop({ default: 1 }) status!: number; // 消息的状态：1存在、0删除
  @Prop({ default: "" }) content!: string; // 内容
  @Prop({ default: true }) createdShow!: boolean; // 是否展示时间
  @Prop({ default: "" }) created!: Date; // 创建时间
  @Prop({ default: () => ({}) }) opposite!: any; // 对方的信息
  @Prop({ default: "" }) whisperId!: string; // 私信Id

  // 自己的信息
  private get self() {
    return this.$store.state.userInfo;
  }
  // 是对方的头像还是自己的头像
  private get avatar() {
    return this.me ? this.self.pic : this.opposite.pic;
  }

  // 时间格式化
  private dateFormat(date: any) {
    date = typeof date === "object" ? date : new Date(date);
    let result = "";
    const now = new Date(),
      day = date.getDate().toString().padStart(2, "0"),
      hour = date.getHours().toString().padStart(2, "0"),
      minutes = date.getMinutes().toString().padStart(2, "0");

    if (
      now.getDate() - date.getDate() === 0 &&
      now.getTime() - date.getTime() < 86400000
    ) {
      result = `${hour}:${minutes}`;
    } else {
      result = `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${day}日 ${hour}:${minutes}`;
    }

    return result;
  }
}
</script>

<style lang="scss">
.whisper-item-outermost {
  .msg-time {
    padding: 16px 0 16px;
    text-align: center;
    color: #999;
    font-size: 12px;
    line-height: 22px;
  }

  .notify-wrapper {
    display: flex;
    justify-content: center;
    padding: 0 10px;
    color: #b2b2b2;
    font-size: 12px;
    line-height: 16px;
    min-height: 30px;

    span {
      padding: 2px 20px;
      background-color: #eaeaea;
      border-radius: 10px;
      line-height: 16px;
      height: 20px;
    }
  }

  .msg-item {
    min-height: 48px;
    padding: 0 16px 16px;
    overflow: hidden;
    position: relative;

    .avatar {
      float: left;
    }

    .message {
      max-width: 480px;
      margin: 0 10px;
      position: relative;
      overflow: hidden;
      float: left;

      .message-content {
        line-height: 1.5;
        font-size: 14px;
        padding: 8px 16px;
        word-wrap: break-word;
        word-break: break-word;
        border-radius: 0 16px 16px 16px;
        overflow: hidden;
        background: #fff;
      }
    }

    .img-pad {
      .message-content {
        padding: 0;
        background-color: transparent !important;

        img {
          max-width: 480px;
        }
      }
    }
  }

  .is-me {
    .avatar {
      float: right;
    }

    .message {
      float: right;
      color: #fff;

      .message-content {
        background: #80b9f2;
        border-radius: 16px 0 16px 16px;
      }
    }
  }
}
</style>
