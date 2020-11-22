<template>
  <div class="message-whisper-outermost">
    <div class="whisper-left">
      <div class="w-title">近期消息</div>
      <div class="w-tab-list">
        <div
          class="w-tab-item"
          v-for="i in 20"
          :key="i"
          :class="{ 'w-active': i === curTab }"
          @click="curTab = i"
        >
          <Avatar class="w-avatar" size="42" />
          <div class="w-info">
            <div class="w-name">小叶森森</div>
            <div class="w-tip">
              小叶森森感谢你的关注，成为粉丝，祝大家哈哈哈
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="whisper-right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "@/components/Avatar.vue";

@Component({
  components: { Avatar },
})
export default class MessageWhisper extends Vue {
  private curTab = 1;
}
</script>

<style lang="scss">
.message-whisper-outermost {
  height: 100%;
  border-radius: 5px;

  .whisper-left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e9eaec;

    .w-title {
      background-color: #fff;
      font-size: 14px;
      color: $contentColor;
      padding-left: 24px;
      line-height: 35px;
      height: 36px;
      border-bottom: 1px solid #e9eaec;
      user-select: none;
      overflow: hidden;
    }

    .w-tab-list {
      background-color: #fff;
      height: calc(100% - 36px);
      overflow: auto;

      .w-tab-item {
        width: 100%;
        display: flex;
        padding: 19px 24px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        .w-avatar {
          margin-right: 8px;
        }

        .w-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.3;

          .w-name {
            color: #333;
          }
          .w-tip {
            color: $contentColor;
            font-size: 12px;
            overflow: hidden;
            width: 155px;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 8px 0;
          }
        }
      }

      .w-active {
        background-color: #e4e5e6;
      }
    }
  }
}
</style>
