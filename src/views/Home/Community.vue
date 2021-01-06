<template>
  <div class="community-outermost">
    <div class="main-container">
      <Layout>
        <div class="wrapper">
          <Content class="main">
            <div class="article">
              <div class="cate-tabs">
                <router-link
                  class="tab"
                  to="/community/"
                  exact-active-class="active"
                >
                  <Icon class="icon" type="md-medal" size="22" />
                  <span>精选</span>
                </router-link>
                <router-link
                  class="tab"
                  to="/community/follow"
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
            <div class="talk-box">
              <div class="back"></div>
              <div class="img-box">
                <img
                  src="https://cdn.sspai.com/article/91aca9d6-daa4-81ce-c581-2561521b9a3a.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!536x340r/gravity/Center/crop/536x340/interlace/1"
                  alt=""
                />
                <div class="talk-tip">
                  <i class="talk-icon"></i>
                  <span>讨论</span>
                </div>
              </div>
              <div class="content">
                <div class="title">你收到过什么奇怪的圣诞礼物？</div>
                <button class="talk-btn">
                  <i class="talk-icon"></i>
                  我来说一说
                </button>
              </div>
            </div>
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
    padding: 0 50px;

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

        .talk-box {
          width: 100%;
          padding: 24px 28px 28px;
          position: relative;
          z-index: 1;

          .back {
            position: absolute;
            z-index: -1;
            left: 0;
            right: 0;
            height: 80%;
            top: 60px;
            background-color: #f7f7f8;
            border-radius: 16px;
          }

          .talk-icon {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQASURBVHgB7ZlPaxRJFMDfq+4eR8xqB9eAIGzvN0hgr2vmsIe9uVn2sOxhncC6LAuL7sVr4icwEfGiED15zAgi3px4FjJ+gmlP0WiYDvhnJtNdz1fV3SqCdlvVHVHmRzLTNfSD9+r97WqACRMmTPiq+WfLD/5+drj/59OpJagBATVyru/7rivXgShAgOU/tg+ehYqp1QDnsDzNis/mawli5betqRZUSK0GJELcAoGhXpD6QIgdWmuxZ6AiajVgZToKkyRe4MuIdc+g4ODUqLJ8qNUAxZWZFz0ScpkdQISk/QCE537aaragAmo3QHH16ItV1nyDwwgxc0XiQCVe2BcDFE4cL7LuEUHuBZj/8UnjF7DEyoCbAz+4OTh2b42/i+69fnwYJkAr2gGk0hlRkrAuq1YGHMDGPY6JeQfctTL3x25jlVXfzROaWPYHy1wwNuD27rGL/BVwQKAEmL82OHq6SKYzHUVS0uq7vyHSKbDA3ANSzKpwZg+oAgMxwXIZMTHGjg4h9gKyOHuhDRYYGzAGXGQlBnpBSh0Irgz8+SK5zglVVmFTpTIp4wn8uUHzOzDE2ICF6cdhTHhJL1D/qVGhXUaWG8JGeqE9QMk4aYEhVknswt6KUiLVhQ0gLFUWJSQPIW0K+Q+zYIiVAQsqKQF68GZOIP/yK78wHJwEum9llCniezDEupHxzveIZKYOwqvnUKjMsNmMtCy90eIIGGJtAJfFR4JroV7wrIOuU+iBLntO3542NZYi4+nUhQqgLB5UVU1ksltaTpmdViJj7Gchke0eqqoI5DlZaf0I+fNA3gtYLAJDrA1wEE+mVzqOMB5DoQc8bxzk16qMohSlvfY+1sMcF/I5HQyktzI8PxP1iuTQo0CHTr4W0AdDrAxoCC+b6fWYryzolpFDxFbeP9JmRhtgiHESr6sRmrAN+UaqviTxVhlZDraT7yauM6YQDDH2gCcaS6ky+UZC+N+3O50iuZ+3mgGPr3P5gw2X4LB3YlwYdh/C2AClsB7Ism7kYrlp9IAjUsOzOZY7SRcsMDYglns811O6cwTdv6Z3bhTJ/M67z18tvUA10/G/FIVyH8NiGo2iETh8ZEJdbr+LZWSkK/igC4N87uC6++jB8WEXLEDYJ9TuS9fZ3JPkj3h4GKmeAdS+PzP8PB74VDzPW+LdOqKTnh+ASFJoq7xiXww4s3PorAPQ1o+QKu3ZAwLF/1ABtYfQv9uHZmMUmyOuVkPO9j3+bQR0/c7My1J5U0S9x+v8bsAV7rpeZGdy7IG+TOQFqIh6j9cb8pQ6zFXX2tW66eGvd/mQCyqi7uP1G5L4kVPVew4hIeFChw974UtCvWI6s/1Nv13TK6YJEyZM+Ly8BnWofX8kzWLbAAAAAElFTkSuQmCC");
            width: 24px;
            height: 24px;
            margin-right: 4px;
            display: inline-block;
            background-position: center;
            background-size: contain;
            vertical-align: middle;
          }

          .img-box {
            width: 100%;
            position: relative;
            margin-bottom: 14x;

            .talk-tip {
              position: absolute;
              left: 12px;
              top: 12px;
              width: 80px;
              height: 32px;
              background: #fff;
              font-size: 16px;
              font-weight: 500;
              line-height: 32px;
              text-align: center;
              border-radius: 16px;
            }

            img {
              width: 100%;
              border-radius: 12px;
            }
          }

          .content {
            .title {
              margin-bottom: 8px;
            }

            .talk-btn {
              cursor: pointer;
              display: block;
              width: 124px;
              height: 40px;
              color: #fff;
              background: #292525;
              border-radius: 40px;
              margin: 0 auto 20px;
              line-height: 40px;
              border: 0;
              outline: 0;
              clip-path: inset(1px 3px);
              position: relative;
            }
          }
        }
      }
    }
  }
}
</style>
