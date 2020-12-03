<template>
  <div class="home-outermost">
    <Layout class="layout-wrapper">
      <Header class="header-reset header-fixed">
        <div class="header-container">
          <a href="/" class="logo">
            <img src="@/assets/logo.png" alt="" />
            <span>Tifa</span>
          </a>
          <div class="right" :class="{ 'is-login': token }">
            <Icon class="search" type="ios-search" size="26" />
            <router-link to="/login" v-if="!token">
              <Button shape="circle" class="login-btn">登录</Button>
            </router-link>
            <div class="logined-show" v-else>
              <Badge
                class="header-notice"
                overflow-count="99"
                :count="$store.getters.newMes"
              >
                <router-link to="/message/reply"
                  ><Icon type="md-notifications-outline" size="26"
                /></router-link>
              </Badge>
              <div
                class="header-user"
                @mouseenter="userToolsShow = true"
                @mouseleave="userToolsShow = false"
              >
                <Avatar :src="userInfo.pic" />

                <transition name="fade">
                  <div class="tooltip" v-if="userToolsShow">
                    <div class="arrow">
                      <div class="tip-em"></div>
                      <div class="em1"></div>
                      <div class="em2"></div>
                    </div>

                    <ul class="tips">
                      <router-link
                        tag="li"
                        class="tip"
                        :to="`/user/${usernumber}`"
                      >
                        个人主页
                      </router-link>
                      <router-link tag="li" class="tip" :to="`/setting`">
                        账号设置
                      </router-link>
                      <li class="tip" @click="logout">退出登录</li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <div class="page-container">
          <router-view />
        </div>
      </Layout>
      <Footer>
        <div class="footer-container">
          <div class="logo">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="official">
            <a href="/"><Icon class="search" type="logo-github" size="24" /></a>
            <a href="/"
              ><Icon class="search" type="logo-javascript" size="24"
            /></a>
            <a href="/"><Icon class="search" type="logo-html5" size="24" /></a>
            <a href="/"><Icon class="search" type="logo-nodejs" size="24" /></a>
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
      <router-link to="/write">
        <div class="write-fixed">
          <div class="writer">
            <Icon type="md-create" size="24" />
          </div></div
      ></router-link>
      <div class="top-fixed" @click="toTop">
        <div class="toper">
          <Icon type="md-arrow-up" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { slidePage } from "@/utils/index";
import config from "@/config/index";
import { delStorage } from "@/utils/index";

@Component
export default class Home extends Vue {
  private toTop = slidePage();
  private userToolsShow = false;
  private get token() {
    return this.$store.state.token;
  }
  private get userInfo() {
    return this.$store.state.userInfo;
  }

  private get usernumber() {
    return this.userInfo.usernumber;
  }

  // 退出
  private logout() {
    delStorage("userInfo");
    delStorage("token");
    window.location.reload();
  }
}
</script>

<style lang="scss">
.home-outermost {
  .layout-wrapper {
    min-height: 100vh;

    .header-reset {
      background: #fff;
    }

    .header-fixed {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 100;
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
        display: flex;
        align-items: center;

        i {
          color: #655e5e;
          margin-top: 5px;
        }

        .search {
          margin-right: 20px;
          cursor: pointer;
        }

        .logined-show {
          display: flex;
          align-items: flex-end;

          .header-notice {
            margin-right: 20px;
            cursor: pointer;
            width: 26px;
            height: 26px;
            line-height: 1;
          }

          .header-user {
            height: 36px;
            width: 36px;
            position: relative;
            line-height: 1;

            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }

            .tooltip {
              position: absolute;
              min-width: 92px;
              padding: 8px 0;
              box-shadow: 0 4px 7px rgba(0, 0, 0, 0.16);
              background: #fff;
              color: #655e5e;
              transform: translateX(-32%);
              border: 1px solid #e5e5e5;
              margin-top: 10px;

              .tips {
                text-align: center;
                font-size: 12px;
                line-height: 36px;

                .tip {
                  cursor: pointer;
                  &:hover {
                    background: #e5e5e5;
                    color: #292525;
                  }
                }
              }

              .arrow {
                .tip-em {
                  width: 12px;
                  height: 12px;
                  position: absolute;
                  left: 80px;
                  top: -10px;
                }
                .em1 {
                  position: absolute;
                  bottom: 100%;
                  left: 40px;
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-bottom: 6px solid #8080807e;
                  border-right: 6px solid transparent;
                }
                .em2 {
                  position: absolute;
                  bottom: 100%;
                  left: 41px;
                  width: 0;
                  height: 0;
                  border-left: 5px solid transparent;
                  border-bottom: 5px solid #fff;
                  border-right: 5px solid transparent;
                }
              }
            }
          }
        }
      }

      .is-login {
        align-items: flex-end;

        i {
          margin-top: 0;
        }
      }
    }

    .page-container {
      padding-top: 64px;
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

@media screen and (max-width: 800px) {
  .header-reset {
    padding: 0;
  }

  .tooltip {
    transform: translateX(-50%) !important;

    .em1 {
      left: 57px !important;
    }

    .em2 {
      left: 58px !important;
    }
  }

  .user-page {
    padding-top: 0 !important;
  }
}
</style>
