<template>
  <div class="article-item-outermost">
    <div class="article-item">
      <router-link :to="`/article/${articleObj.articleId}`" class="wrapper">
        <div class="article-info">
          <div class="article-title">
            {{ articleObj.title }}
          </div>
          <div class="other-info">
            <router-link class="author" to="/">
              <Avatar class="user-pic" size="25" :src="articleObj.author.pic" />
              <span>{{ articleObj.author.name }}</span>
            </router-link>
            <div class="article-value">
              <div class="value-item">
                <Icon type="ios-eye" />
                <span>{{ viewCount }}</span>
              </div>
              <div class="value-item">
                <Icon type="md-thumbs-up" />
                <span>{{ likeCount }}</span>
              </div>
              <div class="value-item">
                <Icon type="md-text" />
                <span>{{ commentCount }}</span>
              </div>
              <div class="value-item">
                <Icon type="md-time" />
                <span>{{ createdDate }}</span>
              </div>
            </div>
          </div>
        </div>
        <img :src="baseUrl + articleObj.banner" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import config from "@/config/index";
import { countFormat, dateFormat } from "@/utils/index";

@Component
export default class ArticleItem extends Vue {
  @Prop({ type: Object }) private articleObj!: object;
  private baseUrl = config.baseUrl;

  private get viewCount() {
    return countFormat((this.articleObj as any).viewCount);
  }

  private get likeCount() {
    return countFormat((this.articleObj as any).likeCount);
  }

  private get commentCount() {
    return countFormat((this.articleObj as any).commentCount);
  }

  private get createdDate() {
    return dateFormat((this.articleObj as any).created);
  }
}
</script>

<style lang="scss" scoped>
.article-item-outermost {
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

            .user-pic {
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
}
</style>
