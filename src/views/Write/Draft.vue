<template>
  <div class="write-draft-outermost">
    <Main class="draft-box">
      <div class="draft-list">
        <div class="draft-item" v-for="draft in draftList" :key="draft.draftId">
          <router-link :to="`/draft/${draft.draftId}`" class="title">{{
            draft.title || "无标题"
          }}</router-link>
          <div class="other-info">
            <div class="time">{{ dateFormat(draft.updated) }}</div>
            <div class="separator">·</div>
            <div class="word-number">共 {{ draft.words }} 字</div>
            <div class="separator">·</div>

            <Poptip
              confirm
              placement="right"
              title="确定要删除这个草稿吗？"
              @on-ok="delDraft(draft)"
            >
              <div class="delete">删除</div>
            </Poptip>
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDraftList, delDraft } from "@/api/content";
import { dateFormat } from "@/utils/index";

@Component
export default class Draft extends Vue {
  private draftList: any = [];
  private dateFormat = dateFormat;

  private created() {
    this.getDraftList();

    // 初始化页面标题
    this.$store.commit("setWriteTitle", "Draft");
  }

  // 确定删除草稿
  private async delDraft(currentDel: any) {
    if (!currentDel) return;
    const res: any = await delDraft(currentDel.draftId);

    if (res) {
      this.draftList = this.draftList.filter((item: any) => {
        return item !== currentDel;
      });
      this.$Message.success(res);
    }
  }

  // 获取草稿列表
  private async getDraftList() {
    this.draftList = await getDraftList();
  }
}
</script>

<style lang="scss">
.write-draft-outermost {
  .draft-box {
    margin: 100px auto 0;
    max-width: 710px;
    padding: 0 20px;

    .draft-list {
      .draft-item {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        border-bottom: 1px solid #ebebeb;

        .title {
          color: rgba(18, 18, 18);
          font-size: 16px;
        }

        .other-info {
          display: flex;
          font-size: 14px;
          margin-top: 8px;
          color: $contentColor;

          .separator {
            margin: 0 5px;
          }

          .delete {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
