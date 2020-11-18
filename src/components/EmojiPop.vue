<template>
  <Poptip
    trigger="click"
    placement="bottom"
    title="哈哈"
    width="365"
    class="reset-pop-emoji"
  >
    <slot />
    <template #content>
      <div class="emoji-pop-box">
        <div class="emoji-pop-list">
          <div class="emoji-pop-item" v-for="(i, index) in num" :key="index">
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
        </div>
        <div class="emoji-category-list">
          <div
            class="emoji-category-item active-emoji-category"
            @click="pushEmoji"
          >
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
          <div class="emoji-category-item">
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
          <div class="emoji-category-item">
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
          <div class="emoji-category-item">
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
          <div class="emoji-category-item">
            <img
              src="https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64"
              title="[微笑]"
            />
          </div>
        </div>
      </div>
    </template>
  </Poptip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "@/utils/axios";

@Component
export default class EmojiModal extends Vue {
  private num = new Array(80);
  private aa = [
    {
      id: 1,
      text: "[微笑]",
      url:
        "http://i0.hdslb.com/bfs/emote/685612eadc33f6bc233776c6241813385844f182.png@88w_88h.webp",
    },
    {
      id: 1902,
      text: "[呲牙]",
      url:
        "http://i0.hdslb.com/bfs/emote/b5a5898491944a4268360f2e7a84623149672eb6.png@88w_88h.webp",
    },
    {
      id: 1950,
      text: "[OK]",
      url:
        "http://i0.hdslb.com/bfs/emote/4683fd9ffc925fa6423110979d7dcac5eda297f4.png@88w_88h.webp",
    },
    {
      id: 1956,
      text: "[星星眼]",
      url:
        "http://i0.hdslb.com/bfs/emote/63c9d1a31c0da745b61cdb35e0ecb28635675db2.png@88w_88h.webp",
    },
  ];
  private async pushEmoji() {
    const res = await axios({
      method: "POST",
      url: "/public/getBiEmoji",
      data: {
        emojiList: this.aa,
      },
      timeout: 60000,
    });

    console.log(res);
  }
}
</script>

<style lang="scss">
.emoji-pop-box {
  .emoji-pop-list {
    display: flex;
    flex-wrap: wrap;
    height: 196px;
    overflow: auto;
    align-content: baseline;
    padding: 6px 11px 0;

    .emoji-pop-item {
      width: 24px;
      height: 24px;
      margin: 4px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .emoji-category-list {
    height: 36px;
    overflow: hidden;
    background-color: #eeeeee;
    display: flex;

    .emoji-category-item {
      box-sizing: content-box;
      padding: 7px 18px;
      width: 22px;
      height: 22px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .active-emoji-category {
      background-color: #fff;
    }
  }
}

.reset-pop-emoji {
  .ivu-poptip-title {
    padding: 13px 15px 0;
    border: none;

    &::after {
      content: "";
      display: none;
    }
  }

  .ivu-poptip-body {
    padding: 0;
  }
}
</style>
