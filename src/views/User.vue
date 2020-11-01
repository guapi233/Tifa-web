<template>
  <div class="user-outermost">
    <div class="user-page">
      <div class="user-content">
        <div class="user-info">
          <div class="pic">
            <img :src="userPic" alt="" />
          </div>
          <div class="cont">
            <div class="name">{{ userInfo.name }}</div>
            <div class="summary">还没有介绍自己</div>
          </div>
          <div class="follows">
            <router-link to="/user/follow">关注 0</router-link>
            ·
            <router-link to="/user/followed">粉丝 0</router-link>
          </div>
          <div class="edit">
            <Button shape="circle">编辑</Button>
          </div>
        </div>

        <div class="overview">
          <div class="side-item">
            <div class="title">头衔</div>
            <div class="side-content">
              <div class="con-row">
                <img
                  src="https://cdn.sspai.com/ui/badge/shaoshupaichengyuan.png"
                  alt=""
                />
                <span class="con-txt">MEMBER OF TIFA COMMUNITY</span>
              </div>
            </div>
          </div>

          <div class="side-item">
            <div class="title">个人成就</div>
            <div class="side-content">
              <div class="con-row">
                <Icon type="md-person" size="18" />
                <span class="con-txt">加入社区至今 955 天</span>
              </div>
              <div class="con-row">
                <Icon type="ios-eye" size="18" />
                <span class="con-txt">文章被阅读 7754 次</span>
              </div>
              <div class="con-row">
                <Icon type="md-thumbs-up" size="18" />
                <span class="con-txt">获得 8854 次点赞</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-box">
          <ul class="tabs">
            <router-link
              to="/user"
              exact-active-class="userpage-tab-active"
              class="tab"
              >动态</router-link
            >
            <router-link
              to="/user/article"
              exact-active-class="userpage-tab-active"
              class="tab"
              >文章</router-link
            >
            <router-link
              to="/user/topic"
              exact-active-class="userpage-tab-active"
              class="tab"
              >话题</router-link
            >
            <router-link
              to="/user/collection"
              exact-active-class="userpage-tab-active"
              class="tab"
              >收藏</router-link
            >
            <router-link
              to="/user/follow"
              exact-active-class="userpage-tab-active"
              class="tab"
              >关注</router-link
            >
          </ul>
        </div>

        <!-- 展示内容 -->
        <router-view />
      </div>
      <div class="right-side">
        <div class="side-item">
          <div class="title">头衔</div>
          <div class="side-content">
            <div class="con-row">
              <img
                src="https://cdn.sspai.com/ui/badge/shaoshupaichengyuan.png"
                alt=""
              />
              <span class="con-txt">MEMBER OF TIFA COMMUNITY</span>
            </div>
          </div>
        </div>

        <div class="side-item">
          <div class="title">个人成就</div>
          <div class="side-content">
            <div class="con-row">
              <Icon type="md-person" size="18" />
              <span class="con-txt">加入社区至今 955 天</span>
            </div>
            <div class="con-row">
              <Icon type="ios-eye" size="18" />
              <span class="con-txt">文章被阅读 7754 次</span>
            </div>
            <div class="con-row">
              <Icon type="md-thumbs-up" size="18" />
              <span class="con-txt">获得 8854 次点赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import config from "@/config/index";

@Component
export default class User extends Vue {
  private get userInfo() {
    return this.$store.state.userInfo;
  }

  private get token() {
    return this.$store.state.token;
  }

  private get userPic() {
    return this.userInfo.pic
      ? config.baseUrl + this.userInfo.pic
      : "data:image/gif;base64,R0lGODlhSABIAPQAAOfn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQAAAAALAAAAABIAEgAAAX+oCCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaW4Fk4JgLAACCAYEwEDiXzJiTsIhULGBLJcIoOAHKZBYFKEAsmLh8fplAGIkDdYBdi5INcHODhBgXYA59awEDEYWPhBZmflYCEpCYcRYJUJQBjpmYFGp+AA2hoQ+dWQEFgqiQFweKRgAQsKEStEQBBK+4jxcGu0IAC8ChDqtFAKDIkBPEQhTPmBZVRr0X1bGTRa3b3IXC0j7g4uPD2QXh6HTq3+zug+TZBO3zht5DSQf4+QhIBekl4V++OvCABHCQD1KEcjmaNXxEYQiABxMLPRQSAMGFjyBDihxJUiSGBcv+fgQoWLKly5AV+Fj097JmSZTMHNjcCXLjNwETeNqsQABij14VhLq0cCAlEQAGkioduckpMwZTR6ryNEBq1kMJ1xj7+nErJSsBgmYlavSpAQtZFVgVu0ApBmVnTZgSCqFS3hIBKOyM2ZYVy5oV/qJYOVjxicCDZTr+44tn08kiAOjk+bAwLwBYlSbyPHDh175zPxc4nJUCAjRMnAwIRDbkAwKwLQIYwMBrbZAVHBR4QvqFEwEIIPj+LdJCBAUDcuPY0kAw86HCpc/Y4gDudaEWIBjQ/gIKA+/fp1p4ED0GgAMTDKX/iqGC3MJJzs+//sBviiUQ7JeeBLj914iA800rMNxjloTh4IMQRijhhBRKOEFRgAUQYIUcduhhhRJI9sd5H5ZooocXQIBFCAA7";
  }
}
</script>

<style lang="scss">
.user-outermost {
  min-height: 777px;
  background-color: #f5f7f9;

  .user-page {
    max-width: 1164px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    padding-top: 50px;

    .user-content {
      width: 800px;

      .user-info {
        padding: 30px;
        width: 100%;
        background-color: #fff;
        min-height: 206px;
        position: relative;
        padding-left: 160px;
        max-width: 800px;

        .pic {
          position: absolute;
          left: 30px;
          top: 30px;
          height: 100px;

          img {
            width: 100px;
            height: 100px;
            border-radius: 100%;
          }
        }

        .cont {
          padding-bottom: 20px;
          border-bottom: 1px solid #8e8787;

          .name {
            font-weight: 500;
            font-size: 24px;
            line-height: 34px;
            color: #292525;
            margin-bottom: 11px;
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }

          .summary {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #292525;
            max-width: 390px;
          }
        }

        .follows {
          margin-top: 24px;

          a {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1em;
          }
        }

        .edit {
          position: absolute;
          right: 30px;
          top: 32px;
        }
      }

      .tab-box {
        width: 100%;
        max-width: 800px;
        height: 40px;
        margin-top: 20px;
        padding: 0 12px;

        .tabs {
          display: flex;

          .tab {
            padding: 7px 14px;
            font-size: 16px;
            font-weight: 400;
            margin: 0;
            margin-right: 10px;
          }

          .userpage-tab-active {
            color: $primaryColor;
            font-weight: bold;
            border-bottom: 2px solid $primaryColor;
          }
        }
      }
    }

    .right-side {
      margin-left: 52px;
      position: fixed;
      top: 110px;
      left: calc(50% + 240px);
      z-index: 99;
      width: 264px;
    }

    .overview {
      margin-top: 20px;
      display: none;
    }

    .right-side,
    .overview {
      .side-item {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;

        .title {
          font-size: 16px;
          color: #292525;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .side-content {
          .con-row {
            margin-top: 14px;
            color: #292525;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 12px;

            img {
              width: 20px;
              height: 20px;
            }

            i,
            img {
              margin-right: 10px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .right-side {
    display: none;
  }

  .user-content {
    margin: 0 auto;
  }

  .overview {
    display: block !important;
  }
}

@media screen and (max-width: 800px) {
  .tab-box {
    .tabs {
      a {
        font-size: 14px !important;
      }
    }
  }

  .footer-container {
    display: block !important;
    text-align: center;

    .logo {
      margin-right: 0 !important;
    }

    .footer-txt-pc,
    .link,
    .official {
      text-align: center !important;
    }

    .link span,
    .official a {
      margin: 0 12px !important;
    }
  }
}
</style>
