<template>
  <div class="tabs-outermost">
    <ul class="page-tabs">
      <router-link
        v-for="tab in tabList"
        :key="tab.to"
        tag="li"
        :to="tab.to"
        :active-class="tab.active || 'active'"
        >{{ tab.name }}</router-link
      >
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({ default: () => [] }) private tabList!: object[];
}
</script>

<style lang="scss">
.tabs-outermost {
  .page-tabs {
    margin-left: 5px;
    list-style: none;
    display: flex;

    li {
      min-width: 64px;
      padding: 8px 0;
      text-align: center;
      transition: 0.3s;
      font-size: 16px;
      margin-right: 16px;
      color: #8e8787;
      cursor: pointer;

      &:hover {
        color: $primaryColor;
      }
    }

    .active {
      color: $primaryColor;
      position: relative;

      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: $primaryColor;
      }
    }
  }
}
</style>
