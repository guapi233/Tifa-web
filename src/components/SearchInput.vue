<template>
  <Dropdown
    class="search-input-outermost"
    trigger="custom"
    :visible="visible"
    v-if="!atSearchPage"
  >
    <Input search v-model="inputVal" @on-search="search" />
    <DropdownMenu slot="list">
      <DropdownItem>驴打滚</DropdownItem>
      <DropdownItem>炸酱面</DropdownItem>
      <DropdownItem disabled>豆汁儿</DropdownItem>
      <DropdownItem>冰糖葫芦</DropdownItem>
      <DropdownItem divided>北京烤鸭</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchInput extends Vue {
  private inputVal = "";
  private visible = false;

  private get atSearchPage() {
    return this.$route.path.startsWith("/search");
  }

  private search() {
    if (!this.inputVal) return;

    this.$router.push(`/search?keyword=${this.inputVal}`);
    this.inputVal = "";
  }
}
</script>

<style lang="scss">
.search-input-outermost {
  margin-right: 15px;
  position: relative;

  .ivu-select-dropdown {
    left: 0;
    right: 0;
  }
}
</style>
