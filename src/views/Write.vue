<template>
  <div class="write-outermost" @click="popoverShow = false">
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
          <div
            v-if="currentRoute === 'Edit'"
            class="release-box"
            @click.stop="1"
          >
            <Button class="release" @click="openPublish">
              发布
              <Icon type="ios-arrow-down" size="18" />
            </Button>
            <transition name="fade">
              <div class="popover" v-if="popoverShow">
                <span class="arrow"></span>
                <div class="content">
                  <div class="category-title">发布文章</div>
                  <div class="category-content">
                    绑定合适的话题，能方便分类检索，文章也更容易让读者发下
                  </div>
                  <div class="category-box">
                    <div class="category-list">
                      <div class="category-selector">
                        <Select
                          v-model="tags"
                          filterable
                          multiple
                          placeholder="给文章打上标签吧"
                        >
                          <Option
                            v-for="item in categoryList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                          >
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div class="publish-btn">
                    <Button type="primary" @click="publish">确定</Button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
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
import { addArticle } from "@/api/content";

@Component
export default class Write extends Vue {
  private popoverShow = false;
  private get currentRoute() {
    return this.$store.state.writeTitle;
  }

  private get tags() {
    return this.$store.state.articleTags;
  }
  private set tags(newVal: any) {
    // 同步vuex
    this.$store.commit("setArticleObj", {
      key: "tags",
      value: newVal,
    });
  }

  // 文章标签列表
  private categoryList = [
    {
      value: "游戏",
      label: "游戏",
    },
    {
      value: "生活",
      label: "生活",
    },
    {
      value: "科技",
      label: "科技",
    },
    {
      value: "影视",
      label: "影视",
    },
    {
      value: "兴趣",
      label: "兴趣",
    },
    {
      value: "热点",
      label: "热点",
    },
  ];

  // 打开发布文章区域
  private openPublish() {
    if (!this.$store.state.articleObj.content) {
      this.$Message.error("请输入正文");
    } else if (!this.$store.state.articleObj.title) {
      this.$Message.error("请输入文章标题");
    } else {
      this.popoverShow = true;
    }
  }
  // 发布
  private async publish() {
    if (this.$store.state.writeSubTitle !== "草稿已保存") return;

    const res: any = await addArticle({
      ...this.$store.state.articleObj,
      draftId: this.$store.state.draftId,
    });

    if (!res) {
      this.$Message.error("发布失败，请稍后再试");
      return;
    }

    this.$Message.success("发布成功");
    this.$router.replace(`/article/${res.articleId}`);
    // 清空vuex中关于文章的缓存
    this.$store.commit("clearArticleInfo");
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

      .release-box {
        margin-right: 20px;
        position: relative;

        .release {
          i {
            vertical-align: middle;
          }
        }

        .popover {
          transform: translateX(-50%);
          position: fixed;
          top: 70px;
          line-height: 1;
          cursor: default;
          width: 320px;
          min-height: 236px;
          height: auto;
          opacity: 1;
          margin-top: -4px;
          border-radius: 4px;
          margin-left: -12px;
          z-index: 2;
          outline: 0;
          box-shadow: 0 5px 20px rgba(18, 18, 18, 0.1);
          background: #fff;
          border: 1px solid #ebebeb;

          .arrow {
            position: fixed;
            top: -9px;
            right: 100px;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent transparent #ebebeb;
            border-style: solid;
            border-width: 0 8px 8px;

            &::after {
              content: "";
              border-bottom-color: #fff;
              position: fixed;
              top: -9px;
              right: 100px;
              display: block;
              width: 0;
              height: 0;
              border-color: transparent transparent #fff;
              border-style: solid;
              border-width: 0 8px 8px;
            }
          }

          .content {
            .category-title {
              font-size: 18px;
              padding: 16px;
              font-weight: 600;
              color: #121212;
            }

            .category-content {
              max-height: 270px;
              overflow: auto;
              padding: 0 16px;
              font-size: 14px;
              color: grey;
              line-height: 1.7;
            }

            .category-box {
              padding: 16px;
            }

            .publish-btn {
              padding: 16px;
              text-align: right;
            }
          }
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
