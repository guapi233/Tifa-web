<template>
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
              <Icon type="ios-eye" />
              <span>8</span>
            </div>
            <div class="value-item">
              <Icon type="md-thumbs-up" />
              <span>8</span>
            </div>
            <div class="value-item">
              <Icon type="md-time" />
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
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ArticleItem extends Vue {}
</script>


<style lang="scss" scoped>
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

            i {
              margin-right: 3px;
            }
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
</style>
