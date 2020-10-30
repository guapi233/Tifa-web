<template>
  <div class="community-outermost">
    <div class="main-container">
      <Layout>
        <div class="wrapper">
          <Content class="main">
            <div class="article">
              <div class="cate-tabs">
                <router-link class="tab" to="/" exact-active-class="active">
                  <Icon class="icon" type="md-medal" size="22" />
                  <span>精选</span>
                </router-link>
                <router-link
                  class="tab"
                  to="/follow"
                  exact-active-class="active"
                >
                  <Icon class="icon" type="md-happy" size="22" />
                  <span>关注</span>
                </router-link>
              </div>

              <router-view />
            </div>
          </Content>
          <Sider hide-trigger class="aside" :width="372">
            <div style="height: 158px;background:blue;"></div>
          </Sider>
        </div>
      </Layout>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ClassName extends Vue {}
</script>


<style lang="scss">
.community-outermost {
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
</style>
