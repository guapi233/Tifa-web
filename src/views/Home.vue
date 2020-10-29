<template>
  <div class="outermost">
    <Layout class="layout-wrapper">
      <Header class="header-reset">
        <div class="header-container">
          <a href="/" class="logo">
            <img src="@/assets/logo.png" alt="" />
            <span>Tifa</span>
          </a>
          <div class="right">
            <Icon class="search" type="ios-search" size="32" />
            <Button shape="circle" class="login-btn">登录</Button>
          </div>
        </div>
      </Header>
      <Layout>
        <div class="page-container">
          <Content>
            <div class="top-container">
              <div class="top-show">
                <h1 class="title">TIFA COMMUNITY</h1>
                <ul class="page-tabs">
                  <router-link tag="li" to="/" active-class="active"
                    >社区广场</router-link
                  >
                  <router-link tag="li" to="/topic" active-class="active"
                    >话题</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="main-container">
              <Layout>
                <div class="wrapper">
                  <Content class="main">
                    <div class="article">
                      <div class="cate-tabs">
                        <router-link class="tab" to="/" active-class="active">
                          <Icon class="icon" type="md-medal" size="22" />
                          <span>精选</span>
                        </router-link>
                        <router-link
                          class="tab"
                          to="/follow"
                          active-class="active"
                        >
                          <Icon class="icon" type="md-happy" size="22" />
                          <span>关注</span>
                        </router-link>
                      </div>
                      <div class="article-list">
                        <div class="article-item">
                          <router-link to="/" class="wrapper">
                            <div class="article-info">
                              <div class="article-title">
                                在 MIUI 12 上强制开启全局高刷新率
                              </div>
                              <div class="other-info">
                                <router-link class="author" to="/">
                                  <img
                                    src="https://cdn.sspai.com/2019/11/14/5e970b7834fd522df7520bb00ea9a362.gif?imageMogr2/auto-orient/quality/95/thumbnail/!40x40r/gravity/Center/crop/40x40/interlace/1"
                                    alt=""
                                  />
                                  <span>卢中南</span>
                                </router-link>
                                <div class="article-value">
                                  <div class="value-item">
                                    <Icon type="ios-beer-outline" />
                                    <span>8</span>
                                  </div>
                                  <div class="value-item">
                                    <Icon type="ios-beer-outline" />
                                    <span>8</span>
                                  </div>
                                  <div class="value-item">
                                    <Icon type="ios-beer-outline" />
                                    <span>10月25日</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <img
                              src="https://cdn.sspai.com/article/20ffe8ab-27ef-3198-862e-a6d0ca8a31c6.jpeg?imageMogr2/auto-orient/quality/95/thumbnail/!640x400r/gravity/Center/crop/640x400/interlace/1"
                              alt=""
                            />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </Content>
                  <Sider hide-trigger class="aside" :width="372">
                    <div style="height: 158px;background:blue;"></div>
                  </Sider>
                </div>
              </Layout>
            </div>
          </Content>
        </div>
      </Layout>
      <Footer>我是底部</Footer>
    </Layout>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>


<style lang="scss" scoped>
.outermost {
  .layout-wrapper {
    min-height: 100vh;

    .header-reset {
      background: #fff;
    }

    .ivu-layout {
      background: #fff;
    }

    .header-container {
      max-width: 1164px;
      height: 60px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      margin: auto;
      justify-content: space-between;

      .logo {
        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-right: 8px;
        }
      }

      .right {
        .search {
          margin-right: 20px;
          vertical-align: middle;
        }
      }
    }

    .page-container {
      .top-container {
        padding: 0 50px;
        background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.03));

        .top-show {
          max-width: 1164px;
          padding: 0 12px;
          margin: auto;

          h1 {
            padding: 30px 0 30px 5px;
            text-align: left;
            color: $titleColor;
          }

          .page-tabs {
            margin-left: 5px;
            list-style: none;
            display: flex;

            li {
              min-width: 64px;
              padding: 8px 0;
              text-align: center;
              transition: 0.3s;
              font-size: 16px;
              margin-right: 16px;
              color: #8e8787;
              cursor: pointer;

              &:hover {
                color: $primaryColor;
              }
            }

            .active {
              color: $primaryColor;
              position: relative;

              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 2px;
                background: $primaryColor;
              }
            }
          }
        }
      }

      .main-container {
        .wrapper {
          max-width: 1164px;
          padding: 0 12px;
          margin: auto;
          display: flex;

          .main {
            width: 752px;
            padding: 0 24px;
            margin-top: 24px;

            .article {
              .cate-tabs {
                text-align: left;
                padding: 20px 0;
                border-bottom: 1px solid #e5e5e5;

                .active {
                  color: $primaryColor;
                  font-weight: bold;
                }

                .tab {
                  margin-right: 32px;
                  font-size: 18px;

                  .icon {
                    margin-right: 5px;
                  }
                }
              }

              .article-item {
                border-bottom: 1px solid #e5e5e5;
                padding: 36px 0;

                .wrapper {
                  display: flex;
                  justify-content: space-between;

                  .article-info {
                    .article-title {
                      font-size: 18px;
                      font-weight: 600;
                      line-height: 25px;
                      margin-bottom: 24px;
                      color: $titleColor;
                    }

                    .other-info {
                      display: flex;
                      align-items: center;

                      .author {
                        margin-right: 24px;
                        display: flex;
                        align-items: center;

                        img {
                          width: 25px;
                          height: 25px;
                          border-radius: 100%;
                          margin-right: 8px;
                        }
                      }

                      .article-value {
                        font-size: 12px;
                        color: $contentColor;
                        display: flex;

                        .value-item {
                          margin-right: 12px;
                        }
                      }
                    }
                  }

                  img {
                    width: 160px;
                    height: 100px;
                    border: 1px solid #f7f7f8;
                    transition: all 0.2s ease-out;
                    border-radius: 8px;
                  }
                }
              }
            }
          }

          .aside {
            max-width: 372px;
            padding: 0 24px;
            background: #fff;
            margin-top: 40px;
          }
        }
      }
    }
  }
}
</style>
