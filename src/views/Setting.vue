<template>
  <div class="setting-outermost">
    <div class="setting-container">
      <div class="setting-header">
        <div class="title">账号设置</div>
        <div class="line"></div>
        <ul class="tabs">
          <router-link exact-active-class="active" class="tab" tag="li" to=""
            >资料编辑</router-link
          >
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            to="usernumer"
          >
            <li class="tab">账号和密码</li>
          </router-link>
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            to="mail"
            >消息与邮件</router-link
          >
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            to="preference"
          >
            偏好与隐私
          </router-link>
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            to="filter"
          >
            屏蔽
          </router-link>
        </ul>
      </div>

      <div class="setting-content">
        <div class="setting-base">
          ...
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Setting extends Vue {}
</script>

<style lang="scss">
.setting-outermost {
  min-height: 777px;
  background-color: #f5f7f9;

  .setting-container {
    max-width: 548px;
    width: 100%;
    margin: 0 auto;

    .setting-header {
      .title {
        font-size: 32px;
        line-height: 45px;
        letter-spacing: 0.1em;
        padding: 50px 0 20px;
        color: #292525;
      }

      .line {
        height: 1px;
        background: #e5e5e5;
        margin-bottom: 20px;
      }

      .tabs {
        width: 548px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        .tab {
          color: $contentColor;
          cursor: pointer;
        }

        .avtive {
          color: $primaryColor;
          border-bottom: 2px solid;
        }
      }
    }
  }
}
</style>
