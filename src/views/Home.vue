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
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                      </div>
                      <div class="load-more">
                        <Button shape="circle" type="primary">
                          加载更多
                        </Button>
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
      <Footer>
        <div class="footer-container">
          <div class="logo">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="official">
            <a href="/"><Icon class="search" type="logo-github" size="24"/></a>
            <a href="/"
              ><Icon class="search" type="logo-javascript" size="24"
            /></a>
            <a href="/"><Icon class="search" type="logo-html5" size="24"/></a>
            <a href="/"><Icon class="search" type="logo-nodejs" size="24"/></a>
          </div>
          <div class="websit-info">
            <div data-v-0908746e="" class="link">
              <span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/page/client"
                >
                  下载App
                </a></span
              ><span data-v-0908746e=""
                ><a data-v-0908746e="" href="mailto:contact@sspai.com">
                  联系我们
                </a></span
              ><span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/page/bussiness"
                >
                  商务合作
                </a></span
              ><span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/apply/writing"
                >
                  成为作者
                </a></span
              ><span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/page/support"
                >
                  关于我们
                </a></span
              ><span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/post/37739"
                >
                  用户协议
                </a></span
              ><span data-v-0908746e=""
                ><a
                  data-v-0908746e=""
                  target="_blank"
                  href="https://sspai.com/post/37793"
                >
                  常见问题
                </a></span
              >
            </div>
            <div data-v-0908746e="" class="footer-txt-pc">
              © 2013-2020 少数派 |
              <a
                data-v-0908746e=""
                href="http://www.beian.miit.gov.cn/"
                target="_blank"
                >粤ICP备09128966号-4</a
              >
              | CC BY-NC 4.0
            </div>
          </div>
        </div>
      </Footer>
    </Layout>

    <div class="fixed">
      <div class="write-fixed">
        <div class="writer">
          <Icon type="md-create" size="24" />
        </div>
      </div>
      <div class="top-fixed">
        <div class="toper">
          <Icon type="md-arrow-up" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleItem from "@/components/ArticleItem.vue";

@Component({
  components: { ArticleItem }
})
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

              .load-more {
                margin: 36px 0;
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

    .footer-container {
      max-width: 1164px;
      padding: 0 12px;
      margin: auto;
      display: flex;
      align-items: center;

      .logo {
        margin-right: 40px;
        img {
          width: 42px;
          height: 42px;
        }
      }

      .official {
        flex: 1;
        text-align: left;

        a {
          margin-right: 24px;
        }
      }

      .websit-info {
        span {
          margin-left: 24px;
          font-size: 12px;
        }

        .footer-txt-pc {
          font-size: 10px;
          text-align: right;
        }
      }
    }
  }

  .fixed {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 100;

    .write-fixed {
      margin: 10px 0;

      .writer {
        border: 1px solid #f5f5f5;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: #fff;
        transition: 0.3s;
        color: $primaryColor;

        box-shadow: 0 1px 1px rgba(10, 16, 20, 0.24),
          0 0 1px rgba(10, 16, 20, 0.12);

        &:hover {
          background-color: $primaryColor;
          color: #fff;
        }
      }
    }

    .top-fixed {
      margin: 10px 0;

      .toper {
        border: 1px solid #f5f5f5;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: #fff;
        transition: 0.3s;
        color: $contentColor;
        opacity: 0.7;

        box-shadow: 0 1px 1px rgba(10, 16, 20, 0.24),
          0 0 1px rgba(10, 16, 20, 0.12);

        &:hover {
          opacity: 1;
          color: $primaryColor;
        }
      }
    }
  }
}
</style>
