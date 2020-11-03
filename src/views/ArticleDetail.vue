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
            <img src="@/assets/defaultPic.gif" alt="" />
            <span>Vanilla</span>
          </div>
          <div class="timer">10月13日</div>
        </div>
      </div>
    </div>

    <!-- 文章主体 -->
    <div class="article-body">
      <div class="article-content">
        <h2>我是标题啊啊啊啊</h2>
        <p>
          呜啦啦啦啦啦!大娃娃阿瓦达爱我的骄傲我都个挖掘活动个就爱我批的简欧屁娃机动票据外婆IDjaw破ID就
        </p>
        <a href="baidu.com">去百度啊啊啊啊啊！</a>
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
          <router-link to="/">
            <img :src="item.pic" alt="" />
          </router-link>
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
            <router-link to="/">
              <img src="@/assets/defaultPic.gif" alt="" />
            </router-link>
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
      <div class="comment-box"></div>

      <!-- 推荐阅读 -->
      <div class="recommend-read">
        <div class="header">推荐阅读</div>
        <div class="read-container">
          <div class="article-card">
            <div class="article-item">
              <div class="img-box">
                <img
                  src="https://cdn.sspai.com/2020/10/28/ebb20c9ea3f59e25b5de03eccdeb80e4.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1"
                  alt=""
                />
              </div>
              <div class="card-content">
                <router-link to="/" class="title">
                  如何选择适合你的 iPad Pro？这是我的回答
                </router-link>
                <div class="card-bottom">
                  <router-link class="author" to="/">
                    <img
                      src="https://cdn.sspai.com/2020/05/11/avatar/3c9a70f91923fbd189c3caf27e7b1727.?imageMogr2/auto-orient/quality/95/thumbnail/!48x48r/gravity/Center/crop/48x48/interlace/1"
                      alt=""
                    />
                    <span class="name">zachal</span>
                  </router-link>
                  <div class="right">
                    <Icon type="md-thumbs-up" size="20" />
                    <span>60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
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

          span {
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

          .article-item {
            position: relative;
            width: 264px;
            height: 260px;
            user-select: none;
            max-width: 800px;
            display: flex;
            background: #fff;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;

            .img-box {
              width: 264px;
              position: relative;
              padding-top: 143px;
              overflow: hidden;
              transition: all 0.2s ease-out;
              background: linear-gradient(
                180deg,
                transparent 50%,
                rgba(0, 0, 0, 0.2)
              );
              img {
                width: auto;
                min-width: 100%;
                height: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.2s ease-out, height 0.2s ease-out;
              }
            }

            .card-content {
              width: 100%;
              padding: 20px;
              background: #fff;
              position: absolute;
              z-index: 99;
              top: 142px;
              transition: top 0.2s ease-out;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .title {
                color: #292525;
                height: 45px;
                margin-bottom: 9px;
                font-weight: 600;
                font-size: 17px;
                line-height: 1.4;
                text-align: left;
              }

              .card-bottom {
                color: #655e5e;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .author {
                  display: flex;
                  img {
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 10px;
                  }
                  .name {
                    display: flex;
                    max-width: 90px;
                  }
                }

                .right {
                  display: flex;

                  i {
                    vertical-align: middle;
                  }
                  span {
                    margin-left: 3px;
                  }
                }
              }
            }

            &:hover .img-box {
              width: 264px;

              img {
                height: 110%;
                cursor: pointer;
              }

              &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
                pointer-events: none;
                cursor: pointer;
              }
            }

            &:hover .card-content {
              transform: translateX(0);
              background: #fff;
              top: 132px;
            }
          }
        }
      }
    }
  }
}
</style>
