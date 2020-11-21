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
            v-for="(tab, index) in tabList"
            :key="tab.path"
            :to="tab.path"
            exact-active-class="active"
            @click.native="acTabIndex = index"
          >
            {{ tab.name }}
          </router-link>
        </div>
        <div class="divided-line"></div>
        <router-link class="setting" to="/setting/mail">
          <p><Icon type="md-cog" />消息设置</p>
        </router-link>
      </div>

      <div class="right">
        <div class="title">{{ acTab.name }}</div>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Message extends Vue {
  private acTabIndex = 0;
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

  private get acTab() {
    return this.tabList[this.acTabIndex];
  }
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

      .divided-line {
        border-top: 1px solid rgba(153, 153, 153, 0.253);
        margin: 10px 0;
      }

      .setting {
        display: block;
        padding-left: 30px;
        height: 40px;
        line-height: 40px;

        i {
          margin-right: 5px;
        }
      }
    }

    .right {
      flex: 1;
      padding-left: 10px;

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
        height: calc(100% - 42px);
      }
    }
  }
}
</style>
