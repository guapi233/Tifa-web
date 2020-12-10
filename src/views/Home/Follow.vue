<template>
  <div class="follow-outermost">
    <div class="noop-tip" v-if="!usernumber">
      您还没有登录哦，<router-link to="/login"
        >立刻登录探索更多发现~</router-link
      >
    </div>
    <Updates
      v-else
      :userInfo="userInfo"
      :usernumber="usernumber"
      class="reset-update-item"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Updates from "@/views/User/Update";

@Component({
  components: { Updates },
})
export default class CommunityFollow extends Vue {
  private get userInfo() {
    return this.$store.state.userInfo;
  }
  private get usernumber() {
    return this.$store.state.userInfo.usernumber;
  }
}
</script>

<style lang="scss">
.follow-outermost {
  .noop-tip {
    font-size: 18px;
    color: $contentColor;
    padding: 10px;

    a {
      color: $primaryColor;

      &:hover {
        border-bottom: 1px solid #333;
      }
    }
  }

  .reset-update-item {
    .user-updates {
      .container {
        .update-item-outermost {
          .updates {
            .update-item {
              .update-content {
                /* box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24),
                  0 0 2px rgba(10, 16, 20, 0.12); */
                box-shadow: 0 5px 20px rgba(18, 18, 18, 0.1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
