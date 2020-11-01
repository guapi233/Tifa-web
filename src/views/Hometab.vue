<template>
  <div class="hometab-outermost">
    <Content>
      <div class="top-container">
        <div class="top-show">
          <h1 class="title">TIFA COMMUNITY</h1>
          <ul class="page-tabs">
            <router-link tag="li" to="/community" active-class="active"
              >社区广场</router-link
            >
            <router-link tag="li" to="/topic" active-class="active"
              >话题</router-link
            >
          </ul>
        </div>
      </div>
      <router-view />
    </Content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Hometab extends Vue {}
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
}
</style>
