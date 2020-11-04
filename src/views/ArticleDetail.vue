<template>
  <div class="article-detail-outermost">
    <!-- 顶部信息 -->
    <div class="article-header">
      <div class="gray-bg-box"></div>
      <div class="article-banner">
        <img
          src="https://cdn.sspai.com/article/a00bc7e1-e6f7-0528-ecb9-451e0ec0c9c5.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!1420x708r/gravity/Center/crop/1420x708/interlace/1"
          alt=""
        />
      </div>
      <div class="article-title-box">
        <div class="article-title">
          一日一技｜只要一台电脑，轻松获取米家设备 token
        </div>
        <div class="article-author">
          <div class="author-box">
            <Avatar size="32" />
            <span class="name">Vanilla</span>
          </div>
          <div class="timer">10月13日</div>
        </div>
      </div>
    </div>

    <!-- 文章主体 -->
    <div class="article-body">
      <div ref="articleContent" class="article-content">
        <h2>我是标题啊啊啊啊</h2>
        <p>
          呜啦啦啦啦啦!大娃娃阿瓦达爱我的骄傲我都个挖掘活动个就爱我批的简欧屁娃机动票据外婆IDjaw破ID就
        </p>
        <a href="baidu.com">去百度啊啊啊啊啊！</a>
      </div>

      <!-- 左侧工具栏 -->
      <div
        ref="leftSideBar"
        class="article-left-side"
        :style="{ left: sideBarLeft }"
      >
        <Button
          class="like-btn"
          icon="md-thumbs-up"
          shape="circle"
          size="large"
          type="primary"
        ></Button>
        <div class="count">133</div>
        <div class="comment-icon item">
          <Icon type="md-text" size="28" />
        </div>
        <div class="count">20</div>
        <div class="forward-icon item">
          <Icon type="ios-share" size="28" />
        </div>
        <div class="collection-icon item">
          <Icon type="ios-pricetags" size="28" />
        </div>
      </div>
    </div>

    <!-- 文章标签 -->
    <div class="article-tag">
      <div class="tag-container">
        <div class="tag-item">
          <router-link to="/" class="tag">
            <span class="sub">#</span>
            热门文章
          </router-link>
        </div>
        <div class="tag-item">
          <router-link to="/" class="tag">
            <span class="sub">#</span>
            习惯养成
          </router-link>
        </div>
        <div class="tag-item">
          <router-link to="/" class="tag">
            <span class="sub">#</span>
            应用推荐
          </router-link>
        </div>
      </div>
    </div>

    <!-- 点赞信息、文章操作栏 -->
    <div class="article-action-bar">
      <div class="like-btn">
        <Button shape="circle" icon="md-thumbs-up" size="large">257</Button>
      </div>
      <div class="liked-users">
        <div
          class="pic-item"
          v-for="(item, index) in likedUsers"
          :key="item.name"
          :style="{ 'z-index': 50 - index }"
        >
          <Avatar :src="item.pic" to="/" size="16" />
        </div>
        <div class="tip-info">
          <div class="nickname">
            <router-link to="/">{{ likedUsers[0].name }}</router-link
            >、 <router-link to="/">{{ likedUsers[1].name }}</router-link
            >、
            <router-link to="/">{{ likedUsers[2].name }}</router-link>
          </div>
          <span class="text">等 256 人为本文章点赞</span>
        </div>
      </div>
      <div class="right">
        <div class="forward oper-item">
          <Icon type="ios-share" size="24" />
        </div>
        <div class="collection oper-item">
          <Icon type="ios-pricetags" size="24" />
        </div>
        <div class="other oper-item">
          <Icon type="ios-more" size="24" />
        </div>
      </div>
    </div>

    <div class="line"></div>

    <!-- 文章作者信息 -->
    <div class="article-author">
      <div class="author-container">
        <div class="author-center">
          <div class="author-pic">
            <Avatar size="42" to="/" />
          </div>
          <div class="content">
            <div class="top">
              <router-link to="/">Vanilla</router-link>
              <div class="title"></div>
            </div>
            <div class="summary">
              矫揉造作爱生活 歇斯底里爱乱想 愤世嫉俗爱独行
            </div>
            <div class="follow-btn">
              <Button type="primary" shape="circle">关注</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 广告、评论区、推荐阅读 -->
    <div class="bg-grey">
      <!-- 广告 -->
      <div class="advertisement-box">
        <router-link to="/">
          <img
            src="https://cdn.sspai.com/article/7c092625-11b9-8805-aacc-417de8b39a0c.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!1096x252r/gravity/Center/crop/1096x252/interlace/1"
            alt=""
          />
        </router-link>
      </div>

      <!-- 评论区 -->
      <div class="comment-box">
        <div class="comment">
          <!-- 头部 -->
          <div class="comment-header">
            <div class="comment-title">全部评论（20）</div>
            <div class="review-box">
              <span>热门排序</span>
              <Icon type="ios-funnel-outline" size="14" />
            </div>
          </div>
          <!-- 回复框 -->
          <div class="comment-reply">
            <div class="reply-box">
              <div>
                <div class="title-box">
                  <div class="header-box">
                    <router-link to="/">
                      <img
                        src="https://cdn.sspai.com/avatar/7a833758c66cea9f5702a7813da0c3ec.?imageMogr2/auto-orient/quality/95/thumbnail/!80x80r/gravity/Center/crop/80x80/interlace/1"
                        alt=""
                      />
                    </router-link>
                  </div>
                  <div
                    class="input-text"
                    @click.stop="replyToShow"
                    v-if="!replyShow"
                  >
                    写下你的评论
                  </div>
                  <div class="input-name" v-else>
                    <router-link to="/">Mob233</router-link>
                    <Icon
                      type="md-close"
                      size="18"
                      class="close-reply"
                      @click="replyShow = false"
                    />
                  </div>
                </div>
                <div class="comment-box" v-show="replyShow">
                  <div class="backdrop">
                    <div class="highlights"></div>
                  </div>
                  <textarea ref="replyInput" class="reply-input"></textarea>
                  <div class="handle-box">
                    <Button shape="circle" class="reply-btn">评论</Button>
                    <div class="upload">
                      <Icon type="md-images" size="16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 评论列表 -->
          <div class="comment-list-box">
            <div class="comment-list">
              <div class="comment-container">
                <div class="comment-user">
                  <div class="header-box">
                    <Avatar
                      src="https://cdn.sspai.com/avatar/7a833758c66cea9f5702a7813da0c3ec.?imageMogr2/auto-orient/quality/95/thumbnail/!80x80r/gravity/Center/crop/80x80/interlace/1"
                      to="/"
                      size="40"
                    />
                  </div>
                  <div class="user-box">
                    <div class="name">
                      <router-link to="/" class="user-link">MYC___</router-link>
                    </div>
                    <div class="timer">10月19日</div>
                  </div>
                </div>
                <div class="comment-content-box">
                  <div class="comment-content">
                    <div class="comment-txt">
                      不是用Aqara 网关就可以在使用Homekit 在家庭里显示吗
                    </div>
                    <div class="oper-box">
                      <div class="oper-item">
                        <Icon type="md-text" size="20" />
                        <span>1</span>
                      </div>
                      <div class="oper-item">
                        <Icon type="md-thumbs-up" size="20" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="comment-content-box">
                <div class="comment-children-item">
                  <!-- 子 -->
                  <div class="comment-container">
                    <div class="comment-user">
                      <div class="header-box">
                        <Avatar
                          src="https://cdn.sspai.com/avatar/7a833758c66cea9f5702a7813da0c3ec.?imageMogr2/auto-orient/quality/95/thumbnail/!80x80r/gravity/Center/crop/80x80/interlace/1"
                          to="/"
                          size="40"
                        />
                      </div>
                      <div class="user-box">
                        <div class="name">
                          <router-link to="/" class="user-link"
                            >MYC___</router-link
                          >
                          <span class="decoration"
                            >回复
                            <router-link to="/">夜色催更</router-link></span
                          >
                        </div>
                        <div class="timer">10月19日</div>
                      </div>
                    </div>
                    <div class="comment-content-box">
                      <div class="comment-content">
                        <div class="comment-txt">
                          不是用Aqara 网关就可以在使用Homekit 在家庭里显示吗
                        </div>
                        <div class="oper-box">
                          <div class="oper-item">
                            <Icon type="md-text" size="20" />
                            <span>1</span>
                          </div>
                          <div class="oper-item">
                            <Icon type="md-thumbs-up" size="20" />
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 加载更多评论 -->
          <div class="load-more-comment">
            更多
          </div>
        </div>
      </div>

      <!-- 推荐阅读 -->
      <div class="recommend-read">
        <div class="header">推荐阅读</div>
        <div class="read-container">
          <div class="article-card">
            <ArticleItem3 />
          </div>
          <div class="article-card">
            <ArticleItem3 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import ArticleItem3 from "@/components/ArticleItem3.vue";

@Component({
  components: { ArticleItem3 }
})
export default class ArticleDetail extends Vue {
  private likedUsers = [
    {
      pic:
        "https://cdn.sspai.com/2018/11/02/548771227e5043db36dbf4760015ea32.png?imageMogr2/auto-orient/quality/95/thumbnail/!84x84r/gravity/Center/crop/84x84/interlace/1",
      name: "自动售卖机"
    },
    {
      pic:
        "https://cdn.sspai.com/avatar/7313ad397f4cf47d314f0f94e98c14a9.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!32x32r/gravity/Center/crop/32x32/interlace/1",
      name: "bigginho"
    },
    {
      pic:
        "https://cdn.sspai.com/avatar/27c94833a5e0772e6b72ac0f4a71625c.?imageMogr2/auto-orient/quality/95/thumbnail/!32x32r/gravity/Center/crop/32x32/interlace/1",
      name: "BravoCiao"
    },
    {
      pic:
        "https://cdn.sspai.com/2019/04/17/avatar/e6e2ecd78858cbca0ef60dc2493fdcad.?imageMogr2/auto-orient/quality/95/thumbnail/!32x32r/gravity/Center/crop/32x32/interlace/1",
      name: "xxxbin"
    },
    {
      pic:
        "https://cdn.sspai.com/2017/11/17/feb87d3de3f1d172706f591bb897f626.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!32x32r/gravity/Center/crop/32x32/interlace/1",
      name: "卧槽，冰"
    }
  ];
  private replyShow = false;
  private sideBarLeft = "0";
  @Ref("replyInput") private replyInput!: any;
  @Ref("articleContent") private articleContent!: any;
  @Ref("leftSideBar") private leftSideBar!: any;

  private mounted() {
    // 监听窗口边框 调整左侧工具栏
    this.resetSideBarLeft();
    this.resetSideBarLeft = this.resetSideBarLeft.bind(this);
    window.addEventListener("resize", this.resetSideBarLeft);
  }

  private beforeDestroy() {
    // 销毁监听器
    window.removeEventListener("resize", this.resetSideBarLeft);
  }

  // 重置左侧工具栏的left属性
  private resetSideBarLeft() {
    this.sideBarLeft =
      this.articleContent.offsetLeft -
      (this.leftSideBar.clientWidth + 170) +
      "px";
  }

  // 显示回复输入框
  private replyToShow() {
    this.replyShow = true;
    this.$nextTick(() => {
      this.replyInput.focus();
    });
  }
}
</script>

<style lang="scss">
.article-detail-outermost {
  .article-header {
    position: relative;
    padding-top: 20px;
    z-index: 5;

    .gray-bg-box {
      width: 100%;
      height: 280px;
      background: linear-gradient(0deg, #f4f4f4, #f4f4f4);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .article-banner {
      width: 710px;
      height: 354px;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .article-title-box {
      width: 100%;
      max-width: 664px;
      margin: 0 auto;

      .article-title {
        margin: 40px auto 30px;
        font-weight: 500;
        font-size: 28px;
        line-height: 42px;
        color: #292525;
      }

      .article-author {
        position: relative;
        margin-bottom: 60px;
        display: flex;
        justify-content: space-between;

        .author-box {
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            border-radius: 100%;
          }

          .name {
            color: #292525;
            margin-left: 10px;
          }
        }

        .timer {
          color: $contentColor;
        }
      }
    }
  }

  .article-body {
    position: relative;
    min-height: 340px;

    .article-content {
      width: 100%;
      max-width: 664px;
      margin: 0 auto;
      color: #4c4e4d;
      font-size: 16px;
      letter-spacing: 0.2px;

      p {
        margin: 0 0 20px 0;
        line-height: 30px;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 30px 0 10px 0;
      }

      h2 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        margin-top: 60px;
        margin-bottom: 26px;
        line-height: 140%;
      }

      h3 {
        font-weight: 600;
        font-size: 18px;
        margin-top: 60px;
        margin-bottom: 16px;
        line-height: 140%;
      }

      img {
        position: relative;
        text-align: center;
        outline: none;
        margin: 40px auto;
        max-width: 100%;
      }

      a {
        text-decoration: none;
        border-bottom: 1px solid $primaryColor;
        color: #292525;
        transition: all 0.2s;

        &:hover {
          border-width: 2px;
        }
      }
    }

    .article-left-side {
      position: absolute;
      top: 0;
      transform: translateY(0);
      bottom: auto;
      left: 90px;
      text-align: center;
      z-index: 90;
      color: $contentColor;

      .like-btn {
        margin-bottom: 8px;
        width: 48px;
        height: 48px;
        font-size: 26px;
      }

      .count {
        font-size: 12px;
        line-height: 17px;
      }

      .item {
        margin-top: 20px;
        cursor: pointer;

        &:hover {
          color: $primaryColor;
        }
      }
    }
  }

  .article-tag {
    width: 100%;
    max-width: 687px;
    margin: 60px auto 0;

    .tag-container {
      margin: -8px;

      .tag-item {
        padding: 8px;
        display: inline-block;

        .tag {
          font-size: 12px;
          line-height: 17px;
          letter-spacing: 0.05em;
          color: #655e5e;
          padding: 5px 10px;
          background: #f5f5f5;

          span {
            font-weight: 300;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: 0.1em;
            color: #8e8787;
            margin-right: 2px;
          }
        }
      }
    }
  }

  .article-action-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 687px;
    margin: 30px auto 0;

    .like-btn {
      padding: 10px 0;
      transition: background 0.5s;
      margin-right: 30px;
    }

    .liked-users {
      flex: 1;

      .pic-item {
        display: inline-block;
        border: 1px solid #fff;
        margin-left: -4px;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        position: relative;
        line-height: 1;

        img {
          width: 16px;
          height: 16px;
          border-radius: 100%;
        }

        &:first-child {
          margin-left: 0;
        }
      }

      .tip-info {
        font-size: 12px;
        line-height: 17px;
        color: #8e8787;
        margin-top: 4px;
        .nickname {
          display: inline-block;

          a {
            color: #292525;
            &:hover {
              color: $primaryColor;
            }
          }
        }

        .text {
          margin-left: 3px;
        }
      }
    }

    .right {
      display: flex;

      .oper-item {
        width: 40px;
        height: 40px;
        color: $contentColor;
        cursor: pointer;
        transition: 0.3s;
        line-height: 40px;
        text-align: center;

        &:hover {
          color: $primaryColor;
        }
      }
    }
  }

  .line {
    width: 100%;
    max-width: 687px;
    height: 1px;
    background: #e5e5e5;
    margin: 30px auto;
  }

  .article-author {
    width: 100%;
    max-width: 687px;
    margin: 0 auto;
    padding-bottom: 30px;

    .author-container {
      .author-center {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 410px;
        display: flex;

        .author-pic {
          height: 42px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;

          img {
            width: 42px;
            height: 42px;
            border-radius: 100%;
          }
        }

        .content {
          padding-left: 20px;
          flex: 1;

          .top {
            display: inline-flex;
            align-items: center;

            a {
              font-weight: 500;
              font-size: 18px;
              line-height: 25px;
              color: #292525;

              &:hover {
                color: $primaryColor;
              }
            }
          }

          .summary {
            font-size: 14px;
            line-height: 20px;
            color: $contentColor;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 40px;
          }

          /* .follow-btn {
          } */
        }
      }
    }
  }

  .bg-grey {
    background: #f4f4f4;
    padding: 40px 0;

    .advertisement-box {
      margin-bottom: 40px;
      margin-top: 0;
      width: 100%;
      max-width: 548px;
      margin: 0 auto;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      overflow: hidden;

      img {
        width: 100%;
        max-width: 548px;
        max-height: 126px;
      }
    }

    .comment-box {
      .comment {
        width: 100%;
        max-width: 644px;
        margin: 0 auto;
        margin-top: 40px;

        .comment-header {
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          letter-spacing: 0.06em;
          color: #655e5e;
          text-align: center;
          position: relative;

          .review-box {
            position: absolute;
            font-size: 14px;
            right: 0;
            top: 0;
            color: #8e8787;
            cursor: pointer;

            i {
              margin-left: 3px;
            }
          }
        }

        .comment-reply {
          margin-top: 30px;
          padding: 16px;
          background: #fff;
          .reply-box {
            .title-box {
              display: flex;
              align-items: center;
              font-size: 14px;

              .header-box {
                width: 40px;
                height: 40px;
                overflow: hidden;
                margin-right: 14px;

                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 40px;
                }
              }

              .input-text {
                color: $contentColor;
                flex: 1;
                cursor: text;
              }

              .input-name {
                flex: 1;
                display: flex;
                justify-content: space-between;

                .close-reply {
                  color: rgb(230, 45, 45);
                  cursor: pointer;
                }
              }
            }

            .comment-box {
              position: relative;
              padding-left: 54px;
              margin-top: 10px;

              .backdrop {
                position: absolute;
                z-index: 1;
                top: 0;
                padding: 2px;
                color: #211615;
                width: calc(100% - 54px);
                height: 122px;
                background-color: #fff;
                color: #292525;
                overflow: auto;
                pointer-events: none;
                transition: transform 1s;
                font-size: 16px;
                outline: 0;
                resize: none;
                border: none;
                font-weight: 400;
                line-height: 1.6;

                .highlights {
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 1.6;
                  color: transparent;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
              }

              .reply-input {
                position: relative;
                z-index: 2;
                margin-bottom: 20px;
                width: 100%;
                min-height: 122px;
                height: auto;
                background-color: transparent;
                color: #292525;
                font-size: 16px;
                box-sizing: border-box;
                outline: 0;
                resize: none;
                border: none;
                font-weight: 400;
                line-height: 1.6;
              }

              .handle-box {
                display: flex;

                .reply-btn {
                  margin-right: 10px;
                }

                .upload {
                  width: 30px;
                  height: 30px;
                  background: #f5f5f5;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 14px;
                  border-radius: 15px;
                  cursor: pointer;
                }
              }
            }
          }
        }

        .comment-list-box {
          margin-top: 8px;

          .comment-list {
            margin-bottom: 8px;
            width: 100%;
            padding: 10px 20px 4px 20px;
            background: #fff;

            .comment-content-box {
              padding-left: 54px;
            }

            .comment-container {
              padding: 10px 0;

              .comment-user {
                display: flex;
                align-items: center;

                .header-box {
                  width: 40px;
                  height: 40px;
                  margin-right: 14px;

                  img {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                  }
                }

                .user-box {
                  overflow: hidden;
                  flex: 1;

                  .name {
                    display: flex;
                    align-items: center;

                    .user-link {
                      font-size: 14px;
                      font-weight: 600;
                      margin-bottom: 5px;
                      color: #292525;

                      &:hover {
                        color: $primaryColor;
                      }
                    }

                    .decoration {
                      margin-left: 15px;
                      color: $contentColor;
                    }
                  }

                  .timer {
                    color: #8e8787;
                    font-size: 12px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                }
              }

              .comment-content {
                margin-bottom: 10px;

                .comment-txt {
                  margin-top: 8px;
                  line-height: 1.4;
                  font-size: 16px;
                  color: #4c4e4d;
                  word-wrap: break-word;
                }

                .oper-box {
                  display: flex;
                  margin-top: 16px;
                  min-height: 20px;

                  .oper-item {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    color: $contentColor;
                    margin-right: 16px;

                    span {
                      margin-left: 5px;
                    }
                  }
                }
              }
            }
          }
        }

        .load-more-comment {
          text-align: center;
          background: #fff;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          color: #655e5e;
        }
      }
    }

    .recommend-read {
      width: 100%;
      max-width: 832px;
      margin: 30px auto 0;

      .header {
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.06em;
        color: #655e5e;
        margin-bottom: 30px;
      }

      .read-container {
        width: 100%;
        max-width: 832px;
        .article-card {
          padding: 6px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
