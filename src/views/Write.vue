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
          <div class="write-title">
            <div class="page-title">写文章</div>
            <div class="sub-title">草稿已保存</div>
          </div>
        </div>
        <div class="right">
          <Button class="release">
            发布
            <Icon type="ios-arrow-down" size="18" />
          </Button>
          <Button type="text" class="more">
            <Icon type="ios-more" size="28" />
          </Button>
        </div>
      </div>
    </Header>

    <Main class="edit-box">
      <div class="banner-box banner-empty">
        <Icon type="ios-camera" size="48" />
      </div>

      <div class="title-box">
        <textarea
          class="content"
          placeholder="请输入标题（最多50个字）"
        ></textarea>
      </div>

      <div class="editor-area">
        <RichText />
      </div>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RichText from "@/components/RichText.vue";

@Component({
  components: { RichText }
})
export default class Write extends Vue {}
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

  .edit-box {
    margin: 80px auto;

    .banner-box {
      width: 710px;
      margin: 0 auto 50px;
      min-height: 354px;
      background-color: #f6f6f6;
      cursor: pointer;
      color: grey;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .banner-empty {
      position: relative;

      &::after {
        content: "\6DFB\52A0\9898\56FE";
        color: #999;
        position: absolute;
        cursor: pointer;
        width: 100%;
        text-align: center;
        font-size: 16px;
        left: 0;
        bottom: 64px;
        line-height: 1;
        opacity: 0;
        z-index: 0;
        transform: translateY(-80px);
        transition: all 0.3s;
      }

      &:hover:after {
        font-size: 32px;
        opacity: 1;
        transform: translateY(-40px);
      }
    }

    .title-box {
      width: 710px;
      margin: 0 auto 30px;
      border-bottom: 1px solid rgba(153, 153, 153, 0.4) !important;

      textarea {
        display: block;
        font-size: 28px;
        color: #292525;
        font-weight: 500;
        height: 44px;
        width: 100%;
        border: none;
        outline: none;
        resize: none;
      }
    }

    .editor-area {
      width: 1050px;
      margin: 0 auto;
    }
  }
}
</style>
