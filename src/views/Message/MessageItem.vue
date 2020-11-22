<template>
  <div class="message-item-outermost">
    <div class="item">
      <div class="left-box">
        <Avatar size="46" />
      </div>
      <div class="center-box">
        <div class="top">
          <span class="name">十二的名字叫难忘</span>
          <span class="tip">评论了我的动态</span>
        </div>
        <div class="middle">？了</div>
        <div class="bottom">
          <span class="time">11:50</span>
          <span
            class="reply"
            @click="replyShow = !replyShow"
            :class="{ showed: replyShow }"
          >
            <Icon type="md-text" size="16" />回复</span
          >
          <span class="like"><Icon type="md-thumbs-up" size="16" />点赞</span>
          <div class="reply-box" v-if="replyShow">
            <ReplyArea @onSubmit="1" :value.sync="inputVal" />
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="text-box">test</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "@/components/Avatar.vue";
import ReplyArea from "@/components/ReplyArea.vue";

@Component({
  components: { Avatar, ReplyArea },
})
export default class MessageItem extends Vue {
  private inputVal = "";
  private replyShow = false;
}
</script>

<style lang="scss">
.message-item-outermost {
  .item {
    padding-top: 24px;
    padding-bottom: 24px;
    position: relative;
    cursor: pointer;
    display: flex;

    .left-box {
      width: 46px;
      height: 46px;
      margin-right: 20px;
    }

    .center-box {
      flex: 1;

      .top {
        margin-bottom: 10px;

        .name {
          margin-right: 8px;
          color: #333;
        }

        .tip {
          color: $contentColor;
        }
      }

      .middle {
        margin: 0 10px 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #333;
      }

      .bottom {
        color: $contentColor;

        .time {
          margin-right: 15px;
        }

        .reply {
          margin-right: 14px;
        }

        .reply,
        .like {
          &:hover {
            color: $primaryColor;
          }

          i {
            margin-right: 1px;
          }
        }

        .showed {
          color: $primaryColor;
        }

        .reply-box {
          padding: 10px;
          background-color: rgba(153, 153, 153, 0.041);
          width: 100%;
          cursor: text;
        }
      }
    }

    .right-box {
      min-width: 60px;

      .text-box {
        width: 60px;
        height: 60px;
        font-size: 14px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: $contentColor;
      }
    }
  }
}
</style>
