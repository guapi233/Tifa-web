<template>
  <div class="user-update-outermost">
    <div class="user-updates">
      <div class="container">
        <div class="updates">
          <div class="update-item">
            <div class="title-box">
              <div class="left">
                <div class="title">
                  <Avatar to="/user" size="24" />
                  <div class="name">Mob233</div>
                </div>
                <div class="memo">喜欢了文章</div>
              </div>
              <div class="time">
                3小时前
              </div>
            </div>
            <ArticleItem2 />
          </div>

          <div class="update-item">
            <div class="title-box">
              <div class="left">
                <div class="title">
                  <Avatar to="/user" size="24" />
                  <div class="name">Mob233</div>
                </div>
                <div class="memo">
                  评论了
                  <span class="article">田玥涵</span>
                  的文章
                </div>
              </div>
              <div class="time">
                3小时前
              </div>
            </div>
            <div class="update-cont">
              <div class="comment-box">
                <Icon type="ios-quote" size="28" />
                <div class="comment-content">
                  <div class="txt">开不开步，hhh</div>
                  <div class="article-title">
                    原文：<router-link to="/article"
                      >《本周看什么 | 近期值得一看的 8 部作品》</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleItem2 from "@/components/ArticleItem2.vue";

@Component({
  components: {
    ArticleItem2
  }
})
export default class UserUpdate extends Vue {}
</script>

<style lang="scss">
.user-update-outermost {
  .user-updates {
    max-width: 800px;
    width: 100%;
    .container {
      padding: 16px 0;
      .updates {
        .update-item {
          margin-bottom: 22px;
          color: $contentColor;

          .comment-box {
            padding: 30px;
            background: #fff;
            display: flex;

            i {
              margin-right: 30px;
            }

            .comment-content {
              flex: 1;
              word-wrap: break-word;

              .txt {
                font-size: 16px;
                color: #292525;
                width: 100%;
                max-width: 664px;
              }

              .article-title {
                color: #8e8787;
                font-size: 14px;
                margin-top: 12px;
              }

              a {
                color: #292525;

                &:hover {
                  color: $primaryColor;
                }
              }
            }
          }

          .updates-pic {
            width: 24px;
            height: 24px;
            border-radius: 100%;
            vertical-align: middle;
            cursor: pointer;
          }

          .title-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 8px;

            .left {
              display: flex;
              align-items: center;
              .title {
                .name {
                  display: inline-block;
                  color: #292525;
                  margin: 0 14px 0 10px;
                }
              }
              .memo {
                line-height: 32px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .update-item {
    width: 100vw;
    margin-top: 22px;
    padding: 0 10px;
  }
}
</style>
