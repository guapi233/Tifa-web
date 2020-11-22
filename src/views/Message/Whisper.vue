<template>
  <div class="message-whisper-outermost">
    <div class="whisper-left">
      <div class="w-title">近期消息</div>
      <div class="w-tab-list">
        <div
          class="w-tab-item"
          v-for="i in 20"
          :key="i"
          :class="{ 'w-active': i === curTab }"
          @click="curTab = i"
        >
          <Avatar class="w-avatar" size="42" />
          <div class="w-info">
            <div class="w-name">小叶森森</div>
            <div class="w-tip">
              小叶森森感谢你的关注，成为粉丝，祝大家哈哈哈
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="whisper-right">
      <div class="w-title">十二的名字叫难忘</div>
      <div class="w-content">
        <div class="msg-time">2020年11月21日 14:50</div>
        <div class="notify-wrapper"><span>对方撤回了一条消息</span></div>
        <div class="msg-time">14:50</div>
        <div class="msg-item is-me">
          <Avatar class="avatar" size="30" />
          <div class="message">
            <div class="message-content not-img">1</div>
          </div>
        </div>
        <div class="msg-item not-me">
          <Avatar class="avatar" size="30" />
          <div class="message">
            <div class="message-content not-img">1</div>
          </div>
        </div>
        <div class="msg-item is-me">
          <Avatar class="avatar" size="30" />
          <div class="message img-pad">
            <div class="message-content">
              <img src="../../../../timg.jpg" alt="" />
            </div>
          </div>
        </div>
        <div class="msg-item not-me">
          <Avatar class="avatar" size="30" />
          <div class="message img-pad">
            <div class="message-content">
              <img src="../../../../timg.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-input"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "@/components/Avatar.vue";

@Component({
  components: { Avatar },
})
export default class MessageWhisper extends Vue {
  private curTab = 1;

  private created() {
    const { wid } = this.$route.params;
    this.curTab = Number(wid);
  }
}
</script>

<style lang="scss">
.message-whisper-outermost {
  height: calc(100% - 3px);
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  display: flex;

  .whisper-left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e9eaec;

    .w-title {
      background-color: #fff;
      font-size: 14px;
      color: $contentColor;
      padding-left: 24px;
      line-height: 35px;
      height: 36px;
      border-bottom: 1px solid #e9eaec;
      user-select: none;
      overflow: hidden;
    }

    .w-tab-list {
      background-color: #fff;
      height: calc(100% - 36px);
      overflow: auto;

      .w-tab-item {
        width: 100%;
        display: flex;
        padding: 19px 24px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        .w-avatar {
          margin-right: 8px;
        }

        .w-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.3;

          .w-name {
            color: #333;
          }
          .w-tip {
            color: $contentColor;
            font-size: 12px;
            overflow: hidden;
            width: 155px;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 8px 0;
          }
        }
      }

      .w-active {
        background-color: #e4e5e6;
      }
    }
  }

  .whisper-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .w-title {
      background-color: #fff;
      height: 36px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e9eaec;
      position: relative;
      text-align: center;
      color: #333;
    }

    .w-content {
      flex: 1;
      position: relative;
      overflow-x: hidden;
      overflow-y: scroll;

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

    .w-input {
      height: 162px;
      border-top: 1px solid #d8d8d8;
      border-bottom-right-radius: 4px;
      flex-shrink: 0;
      padding: 0 16px;
      position: relative;
      z-index: 2;
    }
  }
}
</style>
