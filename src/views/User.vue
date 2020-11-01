<template>
  <div class="user-outermost">
    <div class="user-page">
      <div class="user-content">
        <div class="user-info">
          <div class="pic">
            <img src="@/assets/defaultPic.gif" alt="" />
          </div>
          <div class="cont">
            <div class="name">Mob233</div>
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
        <div class="tab-box">
          <ul class="tabs">
            <router-link
              to="/user"
              active-class="userpage-tab-active"
              class="tab"
              >动态</router-link
            >
            <router-link
              to="/user/articles"
              active-class="userpage-tab-active"
              class="tab"
              >文章</router-link
            >
            <router-link
              to="/user/topic"
              active-class="userpage-tab-active"
              class="tab"
              >话题</router-link
            >
            <router-link
              to="/user/collection"
              active-class="userpage-tab-active"
              class="tab"
              >收藏</router-link
            >
            <router-link
              to="/user/follow"
              active-class="userpage-tab-active"
              class="tab"
              >关注</router-link
            >
          </ul>
        </div>
        <div class="user-updates">
          <div class="container">
            <div class="updates">
              <div class="update-item">
                <div class="title-box">
                  <div class="left">
                    <div class="title">
                      <router-link to="/user"
                        ><img
                          class="updates-pic"
                          src="@/assets/defaultPic.gif"
                          alt=""
                      /></router-link>
                      <div class="name">Mob233</div>
                    </div>
                    <div class="memo">喜欢了文章</div>
                  </div>
                  <div class="time">
                    3小时前
                  </div>
                </div>
                <div class="update-cont">
                  <div class="img-box">
                    <router-link to="/article">
                      <img
                        src="https://cdn.sspai.com/2020/10/29/8eae8c931fb95351d8da34fd6d8d69a2.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1"
                        alt=""
                      />
                    </router-link>
                  </div>
                  <div class="card-content">
                    <router-link to="/article" class="title-cont">
                      我需要什么样的笔记？可全文检索的内容库
                    </router-link>
                    <div class="card-bottom">
                      <div class="left">
                        <div class="pic-box">
                          <router-link to="/user">
                            <img
                              class="updates-pic"
                              src="@/assets/defaultPic.gif"
                              alt=""
                            />
                            <span>其则不远</span>
                          </router-link>
                        </div>
                        <div class="time-box">10月29日</div>
                      </div>
                      <div class="right">
                        <div class="like-count">
                          <Icon type="md-thumbs-up" size="18" />
                          14
                        </div>
                        <router-link
                          to="/article#comment-box"
                          class="comment-count"
                        >
                          <Icon type="md-text" size="18" />
                          7
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="update-item">
                <div class="title-box">
                  <div class="left">
                    <div class="title">
                      <router-link to="/user"
                        ><img
                          class="updates-pic"
                          src="@/assets/defaultPic.gif"
                          alt=""
                      /></router-link>
                      <div class="name">Mob233</div>
                    </div>
                    <div class="memo">
                      评论了
                      <span class="article">田玥涵</span>
                      的文章
                    </div>
                  </div>
                  <div class="time">
                    3小时前
                  </div>
                </div>
                <div class="update-cont">
                  <div class="comment-box">
                    <Icon type="ios-quote" size="28" />
                    <div class="comment-content">
                      <div class="txt">开不开步，hhh</div>
                      <div class="article-title">
                        原文：<router-link to="/article"
                          >《本周看什么 | 近期值得一看的 8 部作品》</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

@Component
export default class User extends Vue {}
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

      .user-updates {
        max-width: 800px;
        width: 100%;
        .container {
          padding: 16px 0;
          .updates {
            .update-item {
              margin-bottom: 22px;
              color: $contentColor;

              .comment-box {
                padding: 30px;
                background: #fff;
                display: flex;

                i {
                  margin-right: 30px;
                }

                .comment-content {
                  flex: 1;
                  word-wrap: break-word;

                  .txt {
                    font-size: 16px;
                    color: #292525;
                    width: 100%;
                    max-width: 664px;
                  }

                  .article-title {
                    color: #8e8787;
                    font-size: 14px;
                    margin-top: 12px;
                  }

                  a {
                    color: #292525;

                    &:hover {
                      color: $primaryColor;
                    }
                  }
                }
              }

              .updates-pic {
                width: 24px;
                height: 24px;
                border-radius: 100%;
                vertical-align: middle;
                cursor: pointer;
              }

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

              .update-cont {
                user-select: none;
                max-width: 800px;
                display: flex;
                background-color: #fff;
                width: 100%;
                .img-box {
                  width: 50%;
                  padding-top: 25%;
                  overflow: hidden;
                  position: relative;
                  transition: all 0.2s ease-out;
                  background: linear-gradient(
                    180deg,
                    transparent 50%,
                    rgba(0, 0, 0, 0.2)
                  );

                  img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    min-width: 100%;
                    width: auto;
                    height: 100%;
                    transition: width 0.2s ease-out, height 0.2s ease-out;
                  }
                }

                .card-content {
                  width: 50%;
                  padding: 30px;
                  box-sizing: border-box;
                  transition: all 0.2s ease-out;
                  display: flex;
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: normal;
                  -ms-flex-direction: column;
                  flex-direction: column;
                  -webkit-box-pack: justify;
                  -ms-flex-pack: justify;
                  justify-content: space-between;

                  .title-cont {
                    color: #292525;
                    font-weight: 600;
                    font-size: 20px;
                    height: 57px;
                    margin-bottom: 20px;
                    line-height: 1.4;
                    text-align: left;
                  }

                  .card-bottom {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;

                    .left {
                      display: flex;
                      .pic-box {
                        margin-right: 10px;
                        display: flex;
                        align-items: center;

                        img {
                          margin-right: 10px;
                        }

                        span {
                          color: #292525;
                        }
                      }
                    }

                    .right {
                      display: flex;

                      i {
                        margin-right: 3px;
                      }

                      .like-count {
                        display: flex;
                        align-items: center;
                      }

                      .comment-count {
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                      }
                    }
                  }
                }
              }

              &:hover .img-box {
                width: 380px;
              }

              &:hover .img-box img {
                height: 110%;
              }
            }
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
</style>
