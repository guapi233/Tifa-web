<template>
  <Poptip
    v-model="visible"
    trigger="click"
    placement="bottom"
    title="哈哈"
    width="365"
    class="reset-pop-emoji"
  >
    <slot />
    <template #content>
      <div class="emoji-pop-box">
        <div class="emoji-pop-list" @click="pushEmoji">
          <div
            class="emoji-pop-item"
            v-for="emoji in showList"
            :key="emoji.id"
            :data-emoji="`${activeCategory}哎呀分割${emoji.url}`"
          >
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
import { Component, Vue, Prop } from "vue-property-decorator";
import emojiList from "@/assets/emoji.js";
import { selectEle } from "@/utils";

@Component
export default class EmojiModal extends Vue {
  // 选择后需要执行的回调
  @Prop({ default: () => ({}) }) private selected!: Function;
  private emojiList = emojiList;
  private activeCategory = 0;
  private visible = false;

  // 当前展示的EMOJI列表
  private get showList() {
    if (!this.emojiList || !this.emojiList[this.activeCategory]) return [];

    return this.emojiList[this.activeCategory].emote;
  }

  // 点击添加EMOJI
  private pushEmoji(e: any) {
    const elm = selectEle(e.path, "emoji");

    // 没找到就没有然后了
    if (!elm) return;

    // 调整EMOJI信息
    const [type, url] = elm.dataset["emoji"].split("哎呀分割");
    const size = elm.children[0].clientWidth >= 50 ? "big" : "small";

    // 执行插入EMOJI回调，将选中的EMOJI信息传入
    this.selected({
      type,
      url,
      size,
    });

    // 关闭弹框
    this.visible = false;
  }
}
</script>

<style lang="scss">
.emoji-pop-box {
  user-select: none;
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

  .ivu-poptip-title-inner {
    user-select: none;
  }
}
</style>
