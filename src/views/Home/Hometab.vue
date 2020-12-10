<template>
  <div class="hometab-outermost">
    <Content>
      <div class="top-container">
        <div class="top-show">
          <h1 class="title">TIFA COMMUNITY</h1>
          <Tabs :tabList="tabList" />
        </div>
      </div>
      <router-view />
    </Content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Tabs },
})
export default class Hometab extends Vue {
  private tabList = [
    {
      to: "/community",
      name: "社区",
    },
    {
      to: "/topic",
      name: "话题",
    },
  ];
}
</script>

<style lang="scss">
.top-container {
  padding: 0 50px;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.03));

  .top-show {
    max-width: 1164px;
    padding: 0 12px;
    margin: auto;

    h1 {
      padding: 30px 0 30px 5px;
      text-align: left;
      color: $titleColor;
    }
  }
}
</style>
