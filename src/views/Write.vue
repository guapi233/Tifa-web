<template>
  <div class="write-outermost">
    <Header class="header-reset header-fixed">
      <div class="header-container">
        <a href="/" class="logo">
          <img src="@/assets/logo.png" alt="" />
          <span>Tifa</span>
        </a>
        <i class="delimit-line"></i>
        <div class="write-title-wrapper">
          <div class="write-title" v-if="currentRoute === 'Edit'">
            <div class="page-title">写文章</div>
            <div class="sub-title">{{ $store.state.writeSubTitle }}</div>
          </div>
          <div class="write-title" v-else>
            <div class="page-title">草稿</div>
          </div>
        </div>
        <div class="right">
          <Button class="release" v-if="currentRoute === 'Edit'">
            发布
            <Icon type="ios-arrow-down" size="18" />
          </Button>
          <router-link to="/write" v-else>
            <Button class="release" type="primary">
              <Icon type="md-create" />
              写文章
            </Button>
          </router-link>

          <Dropdown trigger="click">
            <Button type="text" class="more">
              <Icon type="ios-more" size="28" />
            </Button>
            <DropdownMenu slot="list">
              <router-link to="/draft">
                <DropdownItem> 草稿 </DropdownItem>
              </router-link>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Header>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Write extends Vue {
  private currentRoute: string | null | undefined;

  private created() {
    this.changeHeaderBtnShow();
  }

  @Watch("$route")
  private onRouteChange(newVal: any, oldVal: any) {
    this.changeHeaderBtnShow();
  }

  // 切换顶部导航栏按钮展示
  private changeHeaderBtnShow() {
    const { name } = this.$route;
    this.currentRoute = name;
  }
}
</script>

<style lang="scss">
.write-outermost {
  .header-reset {
    background: #fff;
    box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  }

  .header-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
  }

  .header-container {
    max-width: 1164px;
    height: 60px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    margin: auto;

    .logo {
      img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }

    .write-title-wrapper {
      display: flex;
      height: 52px;
      align-items: center;
      justify-content: center;
      margin-left: 16px;

      .write-title {
        display: flex;
        align-items: center;
        font-size: 16px;

        .page-title {
          margin-right: 20px;
          color: #121212;
          font-weight: bold;
        }

        .sub-title {
          flex: 1 1;
          overflow: hidden;
          color: #999;
        }
      }
    }

    .delimit-line {
      height: 29px;
      width: 1px;
      background-color: #ebebeb;
      margin-left: 17px;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .release {
        margin-right: 20px;

        i {
          vertical-align: middle;
        }
      }

      .more {
        color: #8590a6;
        cursor: pointer;
      }
    }
  }
}
</style>
