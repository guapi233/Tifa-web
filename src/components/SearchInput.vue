<template>
  <Dropdown class="search-input-outermost" trigger="custom" :visible="visible">
    <Input search v-model="inputVal" />
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
