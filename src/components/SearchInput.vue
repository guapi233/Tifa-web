<template>
  <Dropdown
    class="search-input-outermost"
    trigger="custom"
    :visible="visible"
    v-if="!atSearchPage"
  >
    <Input
      search
      v-model="inputVal"
      @on-search="search"
      @on-focus="dropShow"
      @on-blur="visible = false"
      @on-change="getSearch"
    />

    <DropdownMenu slot="list">
      <DropdownItem
        v-for="record in searchRecord"
        :key="record.time || record.searchId"
        @click.native="search(record.content)"
        >{{ record.content }}</DropdownItem
      >
    </DropdownMenu>
  </Dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getStorage, setStorage, debounce } from "@/utils/index";
import { addSearch, getSearch } from "@/api/public";

@Component
export default class SearchInput extends Vue {
  private inputVal = "";
  private visible = false;
  private searchRecord: any = [];

  private get atSearchPage() {
    return this.$route.path.startsWith("/search");
  }

  // 触发检索动作
  private search(keyword = this.inputVal) {
    if (!keyword) return;

    this.$router.push(`/search?keyword=${keyword}`);

    // 添加检索记录到本地
    this.setLocalSearchRecord(keyword);
    // 添加检索记录到远端
    addSearch(keyword);

    this.inputVal = "";
  }
  // 下拉框出现
  private dropShow() {
    if (!this.inputVal) {
      this.searchRecord = this.getLocalSearchRecord();
    } else {
      this.getSearch();
    }

    if (this.searchRecord.length) {
      this.visible = true;
    }
  }
  // 获取检索推荐
  private getSearch = debounce(this.getSearch_, 300);
  private async getSearch_() {
    this.searchRecord = await getSearch(this.inputVal);

    this.visible = Boolean(this.searchRecord.length);
  }

  // 本地检索记录的读写
  private getLocalSearchRecord() {
    const records = getStorage("searchRecord") || [];

    return records.slice(0, 10);
  }
  private setLocalSearchRecord(keyword: string) {
    const [exist] = this.searchRecord.filter((record: any, index: number) => {
      if (record.content === keyword) {
        record.time = Date.now();
        this.searchRecord.splice(index, 1);
        this.searchRecord.unshift(record);
        return true;
      }
      return false;
    });

    if (!exist) {
      this.searchRecord.unshift({
        content: keyword,
        time: Date.now(),
      });
    }
    setStorage("searchRecord", JSON.stringify(this.searchRecord));
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

    .ivu-dropdown-menu {
      .ivu-dropdown-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
