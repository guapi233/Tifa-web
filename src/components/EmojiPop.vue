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
          <div class="emoji-pop-item" v-for="emoji in showList" :key="emoji.id">
            <span v-if="emojiList[activeCategory].id === 4" class="emoticon">{{
              emoji.url
            }}</span>
            <img
              v-else
              :src="emoji.url"
              :class="`webp-${activeCategory}`"
              :title="`[${emoji.text}]`"
            />
          </div>
        </div>
        <div class="emoji-category-list">
          <div
            class="emoji-category-item"
            v-for="(category, index) in emojiList"
            :class="{ 'active-emoji-category': activeCategory === index }"
            :key="category.id"
            @click="activeCategory = index"
          >
            <img :src="category.url" :title="`[${category.text}]`" />
          </div>
        </div>
      </div>
    </template>
  </Poptip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import emojiList from "@/assets/emoji.js";

@Component
export default class EmojiModal extends Vue {
  private emojiList = emojiList;
  private activeCategory = 0;

  private get showList() {
    if (!this.emojiList || !this.emojiList[this.activeCategory]) return [];

    return this.emojiList[this.activeCategory].emote;
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
      padding: 4px;
      border-radius: 3px;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }

      .emoticon {
        padding: 3px 5px;
      }

      img {
        vertical-align: middle;
      }

      .webp-0,
      .webp-2 {
        width: 24px;
        height: 24px;
      }

      .webp-1,
      .webp-4 {
        width: 55px;
        height: 55px;
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
      cursor: pointer;

      img {
        width: 22px;
        height: 22px;
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
