<template>
  <div class="setting-outermost">
    <div class="setting-container">
      <div class="setting-header">
        <div class="title">账号设置</div>
        <div class="line"></div>
        <ul class="tabs">
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            :to="{ name: 'SettingBase' }"
            >资料编辑</router-link
          >
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            :to="{ name: 'SettingAccount' }"
          >
            账号和密码
          </router-link>
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            :to="{ name: 'SettingMail' }"
            >消息与邮件</router-link
          >
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            :to="{ name: 'SettingPreference' }"
          >
            偏好与隐私
          </router-link>
          <router-link
            exact-active-class="active"
            class="tab"
            tag="li"
            :to="{ name: 'SettingFilter' }"
          >
            屏蔽
          </router-link>
        </ul>
      </div>

      <div class="setting-content">
        <router-view />
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
  min-height: 809px;
  background-color: #f5f7f9;
  overflow: hidden;

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
          padding: 4px 0;
          margin: 0;
          line-height: 24px;
          letter-spacing: 0.1em;
          transition: color 0.2s;
        }

        .active {
          color: $primaryColor;
          border-bottom: 2px solid;
        }
      }
    }

    .setting-content {
      margin: 40px auto;
    }
  }
}
</style>
