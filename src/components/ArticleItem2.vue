<template>
  <div class="article-item2-outermost">
    <div class="update-cont">
      <div class="img-box">
        <router-link to="/article">
          <img
            src="https://cdn.sspai.com/2020/10/29/8eae8c931fb95351d8da34fd6d8d69a2.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1"
            alt=""
          />
        </router-link>
      </div>
      <div class="card-content">
        <router-link to="/article" class="title-cont">
          我需要什么样的笔记？可全文检索的内容库
        </router-link>
        <div class="card-bottom">
          <div class="left">
            <div class="pic-box">
              <router-link to="/user">
                <img class="updates-pic" src="@/assets/defaultPic.gif" alt="" />
                <span>其则不远</span>
              </router-link>
            </div>
            <div class="time-box">10月29日</div>
          </div>
          <div class="right">
            <div class="like-count">
              <Icon type="md-thumbs-up" size="18" />
              14
            </div>
            <router-link to="/article#comment-box" class="comment-count">
              <Icon type="md-text" size="18" />
              7
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ArticleItem2 extends Vue {}
</script>

<style lang="scss">
.article-item2-outermost {
  .update-cont {
    user-select: none;
    max-width: 800px;
    display: flex;
    background-color: #fff;
    width: 100%;
    color: $contentColor;

    .updates-pic {
      width: 24px;
      height: 24px;
      border-radius: 100%;
      vertical-align: middle;
      cursor: pointer;
    }

    .img-box {
      width: 50%;
      padding-top: 25%;
      overflow: hidden;
      position: relative;
      transition: all 0.2s ease-out;
      background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.2));

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        width: auto;
        height: 100%;
        transition: width 0.2s ease-out, height 0.2s ease-out;
      }
    }

    .card-content {
      width: 50%;
      padding: 30px;
      box-sizing: border-box;
      transition: all 0.2s ease-out;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      .title-cont {
        color: #292525;
        font-weight: 600;
        font-size: 20px;
        height: 57px;
        margin-bottom: 20px;
        line-height: 1.4;
        text-align: left;
      }

      .card-bottom {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        .left {
          display: flex;
          .pic-box {
            margin-right: 10px;
            display: flex;
            align-items: center;

            img {
              margin-right: 10px;
            }

            span {
              color: #292525;
            }
          }
        }

        .right {
          display: flex;

          i {
            margin-right: 3px;
          }

          .like-count {
            display: flex;
            align-items: center;
          }

          .comment-count {
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }

    &:hover .img-box {
      width: 380px;
    }

    &:hover .img-box img {
      height: 110%;
    }
  }
}

@media screen and (max-width: 800px) {
  .update-cont {
    display: block !important;
    position: relative;

    .img-box {
      width: 100% !important;
      padding-top: 0 !important;

      img {
        position: static !important;
        transform: none !important;
        width: 100% !important;
        height: auto !important;
      }
    }

    .card-content {
      width: auto !important;

      .card-bottom {
        position: absolute;
        top: 150px;
        left: 10px;
        color: #fff !important;

        a {
          span {
            color: #fff !important;
          }
        }

        .right {
          display: none !important;
        }
      }
    }
  }
}
</style>
