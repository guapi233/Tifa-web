<template>
  <div class="message-outermost">
    <div class="container">
      <div class="left">
        <div class="title">
          <p><Icon type="ios-paper-plane" size="16" />消息中心</p>
        </div>
        <div class="tab-list">
          <Badge
            v-for="(tab, index) in tabList"
            :key="tab.path"
            :count="$store.state[tab.badge]"
            :offset="[20, -20]"
          >
            <router-link
              class="tab"
              :to="tab.path"
              active-class="active"
              @click.native="acTabIndex = index"
            >
              {{ tab.name }}
            </router-link>
          </Badge>
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
      path: "/message/reply",
      name: "回复我的",
      badge: "newcomment",
    },
    {
      path: "/message/follow",
      name: "新的关注",
      badge: "newfollow",
    },
    {
      path: "/message/like",
      name: "收到的赞",
      badge: "newlike",
    },
    {
      path: "/message/system",
      name: "系统通知",
      badge: "newsystem",
    },
    {
      path: "/message/whisper/",
      name: "我的私信",
      badge: "newwhisper",
    },
  ];

  // 当前选中的路由项
  private get acTab() {
    return this.tabList[this.acTabIndex];
  }

  private created() {
    this.setActiceRoute();
  }

  // 设置当前选中路由的索引
  private setActiceRoute() {
    const { fullPath } = this.$route;

    this.tabList.forEach((item, index) => {
      if (item.path === fullPath) this.acTabIndex = index;
    });
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

        .total {
          height: 100%;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.14);
          padding: 24px 16px;
          overflow: auto;

          .scroll-outermost {
            padding-right: 5px;
          }

          .divider {
            width: calc(100% - 44px);
            height: 1px;
            border-bottom: 1px solid #e5e9ef;
            position: relative;
            left: 60px;
          }
        }

        .wrap {
          &:first-child {
            .item {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
