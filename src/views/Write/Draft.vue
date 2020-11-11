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
            <div class="delete">删除</div>
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDraftList } from "@/api/content";
import { dateFormat } from "@/utils/index";

@Component
export default class Draft extends Vue {
  private draftList: any = [];
  private dateFormat = dateFormat;

  private created() {
    this.getDraftList();
  }

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
        }
      }
    }
  }
}
</style>
