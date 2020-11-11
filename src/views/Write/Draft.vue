<template>
  <div class="write-draft-outermost">
    <Main class="draft-box">
      <div class="draft-list">
        <div class="draft-item" v-for="draft in draftList" :key="draft.draftId">
          <router-link to="/" class="title">{{ draft.title }}</router-link>
          <div class="other-info">
            <div class="time">{{ dateFormat(draft.created) }}</div>
            <div class="separator">·</div>
            <div class="word-number">共 2 字</div>
            <div class="separator">·</div>
            <div class="delete" @click="openModal1(draft)">删除</div>
          </div>
        </div>
      </div>
    </Main>

    <Modal
      v-model="modal1"
      title="删除草稿"
      @on-ok="delDraft"
      @on-cancel="cancelDel"
    >
      <p>确定要删除这个草稿吗？</p>
    </Modal>
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
  // 当前要删除的元素
  private currentDel: any = null;
  private modal1 = false;

  private created() {
    this.getDraftList();
  }

  // 打开删除模态框
  private openModal1(draft: any) {
    // 设置当前点击的元素为准备删除的草稿
    this.currentDel = draft;
    // 打开模态框
    this.modal1 = true;
  }

  // 确定删除草稿
  private async delDraft() {
    if (!this.currentDel) return;
    const res: any = await delDraft(this.currentDel.draftId);

    if (res) {
      this.draftList = this.draftList.filter((item: any) => {
        return item !== this.currentDel;
      });
      this.$Message.success(res);
    }
    // 情况待删变量
    this.currentDel = null;
  }

  // 取消删除草稿
  private async cancelDel() {
    this.currentDel = null;
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
