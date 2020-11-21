<template>
  <div class="message-outermost">
    <div class="container">
      <div class="left">
        <div class="title">
          <p><Icon type="ios-paper-plane" size="16" />消息中心</p>
        </div>
        <div class="tab-list">
          <router-link
            class="tab"
            v-for="tab in tabList"
            :key="tab.path"
            :to="tab.path"
            exact-active-class="active"
          >
            {{ tab.name }}
          </router-link>
        </div>
      </div>

      <div class="right">
        <div class="title">回复我的</div>
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Message extends Vue {
  private tabList = [
    {
      path: "/message/",
      name: "回复我的",
    },
    {
      path: "/message/at",
      name: "@ 我的",
    },
    {
      path: "/message/like",
      name: "收到的赞",
    },
    {
      path: "/message/system",
      name: "系统通知",
    },
    {
      path: "/message/whisper",
      name: "我的私信",
    },
  ];
}
</script>

<style lang="scss">
.message-outermost {
  min-height: calc(100vh - 64px - 96px);
  background-color: #f5f7f9;
  overflow: hidden;

  .container {
    width: 980px;
    height: calc(100vh - 96px - 64px - 30px);
    margin: 30px auto 0;
    display: flex;

    .left {
      width: 140px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
      padding-bottom: 10px;

      .title {
        height: 62px;
        line-height: 62px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;

        i {
          margin-right: 5px;
        }
      }

      .tab-list {
        padding-left: 40px;

        .tab {
          display: block;
          height: 40px;
          line-height: 40px;
        }

        .active {
          color: $primaryColor;
          font-weight: bold;
        }
      }
    }

    .right {
      flex: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;

      .title {
        border-radius: 5px;
        background-color: #fff;
        height: 42px;
        line-height: 42px;
        padding: 0 16px;
        box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
      }

      .content {
        padding-top: 10px;
        flex: 1;
      }
    }
  }
}
</style>
