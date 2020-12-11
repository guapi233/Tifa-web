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
    />

    <DropdownMenu slot="list">
      <DropdownItem
        v-for="record in searchRecord"
        :key="record.time"
        @click.native="search(record.content)"
        >{{ record.content }}</DropdownItem
      >
    </DropdownMenu>
  </Dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getStorage, setStorage } from "@/utils/index";
import { addSearch } from "@/api/public";

@Component
export default class SearchInput extends Vue {
  private inputVal = "";
  private visible = false;
  private searchRecord: any = [];

  private get atSearchPage() {
    return this.$route.path.startsWith("/search");
  }

  private search(keyword = this.inputVal) {
    if (!keyword) return;

    this.$router.push(`/search?keyword=${keyword}`);

    // 添加检索记录到本地
    this.setLocalSearchRecord(keyword);
    // 添加检索记录到远端
    addSearch(keyword);

    this.inputVal = "";
  }

  private dropShow() {
    if (!this.inputVal) {
      this.searchRecord = this.getLocalSearchRecord();
    } else {
      //
    }

    if (this.searchRecord.length) {
      this.visible = true;
    }
  }

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
