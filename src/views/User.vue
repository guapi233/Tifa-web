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
        <div class="user-updates"></div>
      </div>
      <div class="right-side"></div>
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
    }

    .right-side {
      margin-left: 52px;
      position: fixed;
      top: 110px;
      left: calc(50% + 240px);
      z-index: 99;
      width: 264px;
    }
  }
}
</style>
