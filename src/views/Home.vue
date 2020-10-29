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
        <div class="main-container">
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
            <Layout>
              <Content>我是内容哪</Content>
              <Sider hide-trigger>我是侧边</Sider>
            </Layout>
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
      max-width: 1140px;
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

    .main-container {
      .top-container {
        padding: 0 50px;
        background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.03));

        .top-show {
          max-width: 1140px;
          padding: 0 12px;
          margin: auto;

          h1 {
            padding: 25px 0 25px 5px;
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
    }
  }
}
</style>
