<template>
  <div class="user-outermost">
    <div class="user-page">
      <div class="user-content">
        <div class="user-info">
          <div class="pic">
            <Avatar size="100" :src="userInfo.pic" />
          </div>
          <div class="cont">
            <div class="name">{{ userInfo.name }}</div>
            <div class="summary">
              {{ userInfo.summary || "还没有介绍自己呢" }}
            </div>
          </div>
          <div class="follows">
            <span>关注 {{ userInfo.follow }} </span>
            ·
            <span>粉丝 {{ userInfo.followed }}</span>
          </div>
          <div class="oper" v-if="isSelf">
            <router-link to="/setting">
              <Button shape="circle">编辑</Button>
            </router-link>
          </div>
          <div class="oper" v-else>
            <div class="oper-item" v-if="!userInfo.blacklisted">
              <Button
                shape="circle"
                type="primary"
                v-if="!userInfo.isFollowed"
                @click="followUser"
                >关注</Button
              >
              <Button shape="circle" type="default" v-else @click="followUser"
                >取消关注</Button
              >
            </div>
            <div class="oper-item" v-if="!userInfo.blacklisted">
              <Button shape="circle" @click="toWhisper">私信</Button>
            </div>
            <div class="oper-item" v-else>
              <Button shape="circle" @click="blacklistedShow = true"
                >取消屏蔽</Button
              >
            </div>
          </div>
        </div>

        <div class="overview">
          <div class="side-item">
            <div class="title">头衔</div>
            <div class="side-content">
              <div class="con-row">
                <UserTitle />
              </div>
            </div>
          </div>

          <div class="side-item">
            <div class="title">个人成就</div>
            <div class="side-content">
              <div class="con-row">
                <Icon type="md-person" size="18" />
                <span class="con-txt"
                  >加入社区至今 {{ userInfo.joined || 0 }} 天</span
                >
              </div>
              <div class="con-row" v-if="userInfo.articleCount">
                <Icon type="ios-paper" size="18" />
                <span class="con-txt"
                  >创作文章 {{ userInfo.articleCount }} 篇</span
                >
              </div>
              <div class="con-row" v-if="userInfo.articleCount">
                <Icon type="ios-eye" size="18" />
                <span class="con-txt"
                  >文章被阅读 {{ userInfo.viewCount }} 次</span
                >
              </div>
              <div class="con-row" v-if="userInfo.likeCount">
                <Icon type="md-thumbs-up" size="18" />
                <span class="con-txt"
                  >获得 {{ userInfo.likeCount }} 次点赞</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="tab-box">
          <ul class="tabs">
            <router-link
              :to="{ name: 'UserUpdate', params: usernumber }"
              exact-active-class="userpage-tab-active"
              class="tab"
              >动态</router-link
            >
            <router-link
              :to="{ name: 'UserArticle', params: usernumber }"
              exact-active-class="userpage-tab-active"
              class="tab"
              >文章</router-link
            >
            <router-link
              :to="{ name: 'UserTopic', params: usernumber }"
              exact-active-class="userpage-tab-active"
              class="tab"
              >话题</router-link
            >
            <router-link
              :to="{ name: 'UserCollection', params: usernumber }"
              exact-active-class="userpage-tab-active"
              class="tab"
              >收藏</router-link
            >
            <router-link
              :to="{ name: 'UserFollow', params: usernumber }"
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
              <span class="con-txt"
                >加入社区至今 {{ userInfo.joined || 0 }} 天</span
              >
            </div>
            <div class="con-row" v-if="userInfo.articleCount">
              <Icon type="ios-paper" size="18" />
              <span class="con-txt"
                >创作文章 {{ userInfo.articleCount }} 篇</span
              >
            </div>
            <div class="con-row" v-if="userInfo.articleCount">
              <Icon type="ios-eye" size="18" />
              <span class="con-txt"
                >文章被阅读 {{ userInfo.viewCount }} 次</span
              >
            </div>
            <div class="con-row" v-if="userInfo.likeCount">
              <Icon type="md-thumbs-up" size="18" />
              <span class="con-txt">获得 {{ userInfo.likeCount }} 次点赞</span>
            </div>
          </div>
        </div>

        <!-- 屏蔽举报 -->
        <div class="report-box" v-if="!isSelf">
          <span class="item" @click="blacklistedShow = true">{{
            userInfo.blacklisted ? "取消屏蔽" : "屏蔽用户"
          }}</span>
          <span class="separator"> · </span>
          <span class="item" @click="reportShow = true">举报用户</span>
        </div>
      </div>
    </div>

    <!-- 屏蔽模态框 -->
    <Modal v-model="blacklistedShow" title="提示" @on-ok="setBlacklisted"
      ><p>
        {{
          userInfo.blacklisted
            ? "确定要取消对该用户的屏蔽吗？"
            : "屏蔽后，对方将不能关注你、向你发私信、评论你的文章回答，但仍然可以查看你的公开信息。"
        }}
      </p></Modal
    >
    <!-- 举报模态框 -->
    <ReportModal
      :show.sync="reportShow"
      :type="0"
      :targetId="userInfo.usernumber"
      user
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getUserInfo } from "@/api/public";
import { followUser, setBlacklisted } from "@/api/user";
import { addRoom } from "@/api/content";
import UserTitle from "@/components/UserTitle.vue";
import ReportModal from "@/components/ReportModal.vue";

@Component({
  components: { UserTitle, ReportModal },
})
export default class User extends Vue {
  // 用户信息
  private userInfo: any = {};
  // 用户账号
  private usernumber = "";
  // 举报 & 屏蔽 控件控制变量
  private reportShow = false;
  private blacklistedShow = false;

  // 是否是本人信息
  private get isSelf() {
    return this.userInfo.usernumber === this.$store.state.userInfo.usernumber;
  }

  // 获取用户信息，如果异常跳转至 404 page
  private async setUserInfo() {
    const { usernumber } = this.$route.params;
    this.usernumber = usernumber;

    const res = await getUserInfo(
      usernumber,
      this.$store.state.userInfo.usernumber
    );

    // 用户不存在，to 404
    if (!res) {
      this.$router.replace("/whoops");
    }
    this.userInfo = res;
  }

  private created() {
    this.setUserInfo();
  }

  // 关注用户
  private async followUser() {
    const res = await followUser(this.userInfo.usernumber);

    if (typeof res === "object") {
      this.$Message.success("关注成功");
      this.userInfo.isFollowed = 1;
    } else if (typeof res === "string") {
      this.$Message.info(res);
      this.userInfo.isFollowed = 0;
    }
  }
  // 发起私信
  private async toWhisper() {
    const res = await addRoom(this.userInfo.usernumber);

    if (res) {
      this.$router.replace(`/message/whisper/${res}`);
    }
  }
  // 拉黑用户
  private async setBlacklisted() {
    const res: any = await setBlacklisted(this.usernumber);

    if (!res) return;

    this.$Message.success(res);
    this.userInfo.blacklisted = !this.userInfo.blacklisted;
  }

  // 监听 $route 变化
  @Watch("$route")
  private onRouteChange() {
    this.setUserInfo();
  }
}
</script>

<style lang="scss">
.user-outermost {
  min-height: 809px;
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

          span {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1em;
            color: $contentColor;
          }
        }

        .oper {
          position: absolute;
          right: 30px;
          top: 32px;
          display: flex;

          .oper-item {
            margin-right: 10px;
          }
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

      .report-box {
        color: #8590a6;
        cursor: pointer;

        .item {
          &:hover {
            color: $primaryColor;
          }
        }
      }
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
