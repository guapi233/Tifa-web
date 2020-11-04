<template>
  <div class="article-item3-outermost">
    <div class="article-item">
      <div class="img-box">
        <img
          src="https://cdn.sspai.com/2020/10/28/ebb20c9ea3f59e25b5de03eccdeb80e4.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1"
          alt=""
        />
      </div>
      <div class="card-content">
        <router-link to="/" class="title">
          如何选择适合你的 iPad Pro？这是我的回答
        </router-link>
        <div class="card-bottom">
          <router-link class="author" to="/">
            <!-- <img
              src="https://cdn.sspai.com/2020/05/11/avatar/3c9a70f91923fbd189c3caf27e7b1727.?imageMogr2/auto-orient/quality/95/thumbnail/!48x48r/gravity/Center/crop/48x48/interlace/1"
              alt=""
            /> -->
            <Avatar size="24" />

            <span class="name">zachal</span>
          </router-link>
          <div class="right">
            <Icon type="md-thumbs-up" size="20" />
            <span>60</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ClassName extends Vue {}
</script>

<style lang="scss">
.article-item3-outermost {
  .article-item {
    position: relative;
    width: 264px;
    height: 260px;
    user-select: none;
    max-width: 800px;
    display: flex;
    background: #fff;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;

    .img-box {
      width: 264px;
      position: relative;
      padding-top: 143px;
      overflow: hidden;
      transition: all 0.2s ease-out;
      background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.2));
      img {
        width: auto;
        min-width: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.2s ease-out, height 0.2s ease-out;
      }
    }

    .card-content {
      width: 100%;
      padding: 20px;
      background: #fff;
      position: absolute;
      z-index: 99;
      top: 142px;
      transition: top 0.2s ease-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        color: #292525;
        height: 45px;
        margin-bottom: 9px;
        font-weight: 600;
        font-size: 17px;
        line-height: 1.4;
        text-align: left;
      }

      .card-bottom {
        color: #655e5e;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .author {
          display: flex;
          img {
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
          .name {
            display: flex;
            max-width: 90px;
            margin-left: 10px;
          }
        }

        .right {
          display: flex;

          i {
            vertical-align: middle;
          }
          span {
            margin-left: 3px;
          }
        }
      }
    }

    &:hover .img-box {
      width: 264px;

      img {
        height: 110%;
        cursor: pointer;
      }

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        pointer-events: none;
        cursor: pointer;
      }
    }

    &:hover .card-content {
      transform: translateX(0);
      background: #fff;
      top: 132px;
    }
  }
}
</style>
