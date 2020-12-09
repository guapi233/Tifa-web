<template>
  <div class="user-item-outermost">
    <div class="user-card">
      <Avatar size="50" :src="item.author.pic" />
      <div class="nickname">
        <router-link :to="`/user/${item.author.usernumber}`">{{
          item.author.name
        }}</router-link>
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
</template>

<script lang="ts">
import{ Component, Vue, Prop }from 'vue-property-decorator';

@Component
export default class ClassName extends Vue{
  @Prop({ default: () => ({}) }) private item!: any;
}
</script>

<style lang="scss">
.user-item-outermost {
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
</style>
