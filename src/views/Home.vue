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
