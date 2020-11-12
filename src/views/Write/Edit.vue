<template>
  <div class="write-edit-outermost">
    <Main class="edit-box">
      <div class="banner-box">
        <Upload
          v-if="!articleObj.banner"
          :action="uploadUrl"
          :headers="headers"
          :show-upload-list="false"
          :max-size="5000000"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-err="uploadFail"
        >
          <div class="banner-wrap banner-empty">
            <Icon type="ios-camera" size="48" />
          </div>
        </Upload>
        <div class="banner-wrap" v-else>
          <img :src="articleObj.banner" alt="" />
          <div class="tools">
            <Upload
              :action="uploadUrl"
              :headers="headers"
              :show-upload-list="false"
              :max-size="5000000"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-err="uploadFail"
            >
              <div class="item resume">
                <Icon type="ios-camera" size="24" />
              </div>
            </Upload>
            <div class="item remove" @click="removeBanner">
              <Icon type="ios-trash-outline" size="24" />
            </div>
          </div>
        </div>
      </div>

      <div class="title-box">
        <div class="title-wrap">
          <div v-html="articleObj.title" class="hidden-block"></div>
          <textarea
            class="content"
            v-model="articleObj.title"
            @input="titleChange"
            placeholder="请输入标题（最多50个字）"
            @keydown.enter.prevent="1"
          ></textarea>
        </div>
        <div class="input-tip" v-if="titleTipShow && remainTitleInput >= 0">
          还可以输入 {{ remainTitleInput }} 个字
        </div>
        <div
          class="input-tip warning"
          v-if="titleTipShow && remainTitleInput < 0"
        >
          已超过 {{ -remainTitleInput }} 个字
        </div>
      </div>

      <div class="editor-area">
        <RichText v-model="articleObj.content" />
      </div>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { saveDraft } from "@/api/content";
import { getSid } from "@/utils/index";
import RichText from "@/components/RichText/index.vue";
import config from "@/config";

@Component({
  components: { RichText },
})
export default class Edit extends Vue {
  // 文章内容
  private articleObj = {
    title: "",
    content: "",
    banner: "",
  };
  // 标题控件
  private titleTipShow = false;
  private remainTitleInput = 50;

  // 题图上传
  private headers = {
    Authorization: "bearer " + this.$store.state.token,
  };
  private get uploadUrl() {
    return config.baseUrl + "/uploadImg";
  }
  private beforeUpload() {
    console.log("??");
  }
  private uploadSuccess(res: any) {
    if (res.isOk) {
      this.$Message.success("上传成功");
      this.articleObj.banner = res.data.url;
    } else {
      this.$Message.error("上传失败");
    }
  }
  private uploadFail(err: any) {
    console.log("fail", err);
  }

  // 监听标题变化
  private titleChange() {
    // 检测剩余可输入标题字数
    this.remainTitleInput = 50 - this.articleObj.title.length;

    if (this.remainTitleInput <= 10) {
      this.titleTipShow = true;
    } else {
      this.titleTipShow = false;
    }
  }

  // 移除题图
  private removeBanner() {
    this.articleObj.banner = "";
    this.$Message.info("移除题图");
  }

  // 保存草稿
  private async saveDraft() {
    const res = await saveDraft({
      ...this.articleObj,
      draftId: getSid(),
    });
  }
}
</script>

<style lang="scss">
.write-edit-outermost {
  .edit-box {
    margin: 80px auto;

    .banner-box {
      width: 710px;
      margin: 0 auto 50px;
      background-color: #f6f6f6;

      .banner-wrap {
        width: 710px;
        min-height: 354px;
        color: grey;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        img {
          width: 100%;
        }

        .tools {
          display: flex;
          height: 42px;
          position: absolute;
          right: 0px;
          bottom: 0;
          z-index: 1;
          background: rgba(18, 18, 18, 0.75);
          border-radius: 4px 0 0 0;

          .item {
            height: 42px;
            width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 0;
            padding: 0;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }

    .banner-empty {
      position: relative;
      cursor: pointer;

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
      position: relative;
      font-size: 28px;
      font-weight: 500;

      .title-wrap {
        .hidden-block {
          display: block;
          visibility: hidden;
          min-height: 44px;
          margin: 0;
          word-break: break-all;
        }

        textarea {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          display: block;
          color: #292525;
          width: 100%;
          border: none;
          outline: none;
          resize: none;
          overflow-y: hidden;
        }
      }

      .input-tip {
        position: relative;
        z-index: 1;
        font-size: 14px;
        text-align: right;
        margin-bottom: 16px;
        color: #8590a6;
      }

      .warning {
        color: #f1403c;
      }
    }

    .editor-area {
      width: 1050px;
      margin: 0 auto;
    }
  }
}
</style>
