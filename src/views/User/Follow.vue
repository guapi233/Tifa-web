<template>
  <div class="user-follow-outermost">
    <div class="tab-box">
      <div class="tab-item" :class="{ active: !type }" @click="getList(true)">
        关注
      </div>
      <div class="tab-item" :class="{ active: type }" @click="getList(true)">
        粉丝
      </div>
    </div>
    <div class="user-follow-box">
      <div class="content">
        <div class="user">
          <div class="user-card" v-for="item in cardList" :key="item.followId">
            <Avatar size="50" :src="item.author.pic" />
            <div class="nickname">
              <router-link to="/user">{{ item.author.name }}</router-link>
            </div>
            <div class="count">
              <span class="follow-count">关注 {{ item.author.follow }}</span>
              <span class="followed-count"
                >粉丝 {{ item.author.followed }}</span
              >
              <span class="article-count"
                >文章 {{ item.author.articleCount }}</span
              >
            </div>
            <div class="summary">
              {{ item.author.summary }}
            </div>
            <Button
              shape="circle"
              v-if="item.isFollowed"
              @click="followUser(item)"
              >取消关注</Button
            >
            <Button
              shape="circle"
              type="primary"
              v-else
              @click="followUser(item)"
              >关注</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getFollowList, getFollowedList } from "@/api/content";
import { followUser } from "@/api/user";

@Component
export default class UserFollow extends Vue {
  private type = 0;
  private authorId = "";
  private cardList: any = [];
  private skip = 0;

  private created() {
    this.authorId = this.$route.params.usernumber;
    this.getList();
  }

  private async getFollowList() {
    const { usernumber } = this.$store.state.userInfo;
    const res = await getFollowList(this.authorId, usernumber, this.skip++);

    if (!res) {
      return [];
    }
    return res;
  }

  private async getFollowedList() {
    const { usernumber } = this.$store.state.userInfo;
    const res = await getFollowedList(this.authorId, usernumber, this.skip++);

    if (!res) {
      return [];
    }
    return res;
  }

  private async getList(change = false) {
    // 清空数组 & 回到第一页 & 清空列表
    if (change) {
      this.type = Number(!this.type);
      this.cardList = [];
      this.skip = 0;
    }

    let res: any = [];
    if (this.type) {
      res = await this.getFollowedList();
    } else {
      res = await this.getFollowList();
    }
    this.cardList.push(...res);
  }

  private async handleReachBottom() {
    console.log("??");
  }

  // 关注
  private async followUser(target: any) {
    let res: any = null;

    // 判断当前类型， 如果是我关注的，那要传我关注的对象，否则传authorId，关注我的
    if (!this.type) {
      res = await followUser(target.targetId);
    } else {
      res = await followUser(target.authorId);
    }

    if (typeof res === "object") {
      this.$Message.success("关注成功");
      target.isFollowed = 1;
    } else if (typeof res === "string") {
      this.$Message.info(res);
      target.isFollowed = 0;
    }
  }
}
</script>

<style lang="scss">
.user-follow-outermost {
  .tab-box {
    padding: 20px 12px 20px;
    width: 100%;
    max-width: 800px;
    text-align: right;

    .tab-item {
      display: inline-block;
      margin-left: 30px;
      font-size: 14px;
      line-height: 20px;
      color: #8e8787;
      cursor: pointer;
    }

    .active {
      color: $primaryColor;
      font-weight: bold;
    }
  }

  .user-follow-box {
    .content {
      width: 100%;
      max-width: 822px;
      position: relative;
      display: flex;

      .user {
        flex: 1;
        width: 100%;
        max-width: 822px;
        margin: -10px -9.5px;
        padding-bottom: 20px;

        .user-card {
          float: left;
          margin: 10px 9.5px;
          padding: 20px;
          background: #fff;
          width: 254px;
          height: 260px;
          text-align: center;
          position: relative;

          .nickname {
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: 0.05em;
            margin: 10px 0;

            a {
              color: #292525;
              &:hover {
                color: $primaryColor;
              }
            }
          }

          .count {
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 17px;
            letter-spacing: 0.05em;
            color: #8e8787;

            span {
              margin-right: 10px;

              &:last-child {
                margin-right: 0;
              }
            }
          }

          .summary {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #292525;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
