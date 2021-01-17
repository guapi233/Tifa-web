<template>
  <div class="article-detail-outermost" v-if="articleDetail">
    <!-- 顶部信息 -->
    <div class="article-header">
      <div class="gray-bg-box"></div>
      <div class="article-banner">
        <img :src="bannerPic" alt="" />
      </div>
      <div class="article-title-box">
        <div class="article-title">
          {{ articleDetail.title }}
        </div>
        <div class="article-author">
          <div class="author-box">
            <Avatar
              size="32"
              :src="author.pic"
              :to="`/user/${author.usernumber}`"
            />
            <span class="name">{{ author.name }}</span>
          </div>
          <div class="timer">{{ createdDate }}</div>
        </div>
      </div>
    </div>

    <!-- 文章主体 -->
    <div class="article-body" ref="articleBody">
      <div class="article-content" ref="articleContent">
        <div v-highlight v-html="articleDetail.content"></div>
      </div>

      <!-- 左侧工具栏 -->
      <div
        ref="leftSideBar"
        class="article-left-side"
        :class="`side-${sideBarPos}`"
        v-show="sideBarLeft !== '0'"
        :style="{ left: sideBarLeft }"
      >
        <Button
          class="like-btn"
          icon="md-thumbs-up"
          shape="circle"
          size="large"
          :type="articleLiked ? 'primary' : 'default'"
          @click="likeArticle"
        ></Button>
        <div class="count">{{ likeCount }}</div>
        <div class="comment-icon item" @click="toComment">
          <Icon type="md-text" size="28" />
        </div>
        <div class="count">{{ commentCount }}</div>
        <div class="forward-icon item">
          <Poptip placement="right">
            <Icon type="ios-share" size="28" />
            <template #content>
              <div class="share-box">
                <Icon type="ios-contacts" size="28" @click="shareToQQ" />
              </div>
            </template>
          </Poptip>
        </div>
        <div
          class="collection-icon item"
          :class="{ 'is-collected': articleDetail.isCollected }"
          @click="collectArticle"
        >
          <Icon
            type="ios-bookmark"
            v-if="articleDetail.isCollected"
            size="28"
          />
          <Icon type="ios-bookmark-outline" v-else size="28" />
        </div>
      </div>

      <!-- 右侧工具栏 -->
      <div
        class="article-right-side"
        :class="`side-r-${sideBarPos}`"
        @click="toTitleHere"
      >
        <div class="directory-container" v-for="nav in navList" :key="nav.id">
          <div
            class="item"
            :data-top="nav.id"
            :class="{ 'active-nav': activeNav[0].id === nav.id }"
          >
            <div class="circle"></div>
            <div class="title">{{ nav.val }}</div>
          </div>
          <div class="sub-directory-container">
            <div
              class="item sub-directory"
              :class="{ 'active-nav': activeNav[1].id === navChild.id }"
              v-for="navChild in nav.children"
              :key="navChild.id"
              :data-top="navChild.id"
            >
              <div class="circle h3"></div>
              <div class="title">{{ navChild.val }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章标签 -->
    <div class="article-tag">
      <div class="tag-container">
        <div
          class="tag-item"
          v-for="(tag, index) in articleDetail.tags"
          :key="tag + index"
        >
          <router-link to="/" class="tag">
            <span class="sub">#</span>
            {{ tag }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 点赞信息、文章操作栏 -->
    <div class="article-action-bar">
      <div class="like-btn">
        <Button
          shape="circle"
          icon="md-thumbs-up"
          :type="articleLiked ? 'primary' : 'default'"
          size="large"
          @click="likeArticle"
          >{{ likeCount }}</Button
        >
      </div>
      <div class="liked-users">
        <div
          class="pic-item"
          v-for="(item, index) in likeList"
          :key="item.authorId"
          :style="{ 'z-index': 50 - index }"
        >
          <Avatar :src="item.author.pic" to="/" size="16" />
        </div>
        <div class="tip-info">
          <div class="nickname">
            <router-link to="/" v-if="likeList[0]">{{
              likeList[0].author.name
            }}</router-link>
            <router-link v-if="likeList[1]" to="/"
              >、 {{ likeList[1].author.name }}</router-link
            >
            <router-link v-if="likeList[2]" to="/"
              >、 {{ likeList[2].author.name }}</router-link
            >
          </div>
          <span class="text" v-if="likeList[0]"
            >等 {{ articleDetail.likeCount }} 人为本文章点赞</span
          >
        </div>
      </div>
      <div class="right">
        <div class="forward oper-item">
          <Poptip placement="top">
            <Icon type="ios-share" size="24" />
            <template #content>
              <div class="share-box">
                <Icon type="ios-contacts" size="24" @click="shareToQQ" />
              </div>
            </template>
          </Poptip>
        </div>
        <div
          class="collection oper-item"
          :class="{ 'is-collected': articleDetail.isCollected }"
          @click="collectArticle"
        >
          <Icon
            type="ios-bookmark"
            v-if="articleDetail.isCollected"
            size="24"
          />
          <Icon type="ios-bookmark-outline" v-else size="24" />
        </div>
        <div class="setting-item oper-item" v-if="isAuthor">
          <Dropdown trigger="click">
            <Icon type="md-cog" size="24" />
            <DropdownMenu slot="list">
              <DropdownItem @click.native="modifyArticle"
                >修改文章</DropdownItem
              >
              <DropdownItem
                divided
                :selected="commentAllowers === 1"
                @click.native="setCommentAllow(1)"
                >允许任何人评论</DropdownItem
              >
              <DropdownItem
                :selected="commentAllowers === 2"
                @click.native="setCommentAllow(2)"
                >允许关注我的人评论</DropdownItem
              >
              <DropdownItem
                :selected="commentAllowers === 3"
                @click.native="setCommentAllow(3)"
                >允许我关注的人评论</DropdownItem
              >
              <DropdownItem
                :selected="commentAllowers === 0"
                @click.native="setCommentAllow(0)"
                >关闭评论</DropdownItem
              >
              <DropdownItem divided @click.native="delModalShow = true"
                >删除</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="other oper-item">
          <Dropdown trigger="click">
            <Icon type="ios-more" size="24" />

            <DropdownMenu slot="list">
              <DropdownItem @click.native="reportShow = true"
                >举报此文章</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <!-- 文章作者信息 -->
    <div class="article-author">
      <div class="author-container">
        <div class="author-center">
          <div class="author-pic">
            <Avatar
              size="42"
              :to="`/user/${author.usernumber}`"
              :src="author.pic"
            />
          </div>
          <div class="content">
            <div class="top">
              <router-link :to="`/user/${author.usernumber}`">{{
                author.name
              }}</router-link>
              <div class="title"></div>
            </div>
            <div class="summary">
              {{ author.summary || "还没有介绍自己呢" }}
            </div>
            <div
              class="follow-btn"
              v-if="author.usernumber !== $store.state.userInfo.usernumber"
            >
              <Button
                type="primary"
                shape="circle"
                v-if="!author.isFollowed"
                @click="followUser"
              >
                关注
              </Button>
              <Button shape="circle" v-else @click="followUser">
                取消关注
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 广告、评论区、推荐阅读 -->
    <div class="bg-grey" ref="commentAnchor">
      <!-- 广告 -->
      <div class="advertisement-box">
        <router-link to="/">
          <img
            src="https://cdn.sspai.com/article/7c092625-11b9-8805-aacc-417de8b39a0c.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!1096x252r/gravity/Center/crop/1096x252/interlace/1"
            alt=""
          />
        </router-link>
      </div>

      <!-- 评论区 -->
      <Comment
        :commentList.sync="commentList"
        :targetId="articleId"
        :authorId="author.usernumber"
        :commentCount="articleDetail.commentCount"
        :commentSort.sync="commentSort"
        :canGetComment="canGetComment"
        :replyAllow="allowComment[0]"
        :replyTip="allowComment[1]"
        @changeSort="getCommentList"
        @loadmore="getCommentList"
      />

      <!-- 推荐阅读 -->
      <div class="recommend-read">
        <div class="header">推荐阅读</div>
        <div class="read-container">
          <div
            class="article-card"
            v-for="rec in recArticleList"
            :key="rec.articleId"
          >
            <ArticleItem3 :articleObj="rec" />
          </div>
        </div>
      </div>
    </div>

    <!-- 删除文章模态框 -->
    <Modal v-model="delModalShow" title="提示" @on-ok="delArticle">
      <p>确定要删除这篇文章吗？</p>
    </Modal>
    <!-- 举报文章模态框  -->
    <ReportModal
      :type="1"
      :targetId="articleDetail.articleId"
      :show.sync="reportShow"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch, Inject } from "vue-property-decorator";
import { dateFormat, countFormat, slidePage } from "@/utils/index";
import {
  getArticleDetail,
  getCommentList,
  addLike,
  getLikeList,
  addCollection,
  getRecArticle,
  delArticle,
  saveDraft,
  existDraft,
  setArticleCommentAllow,
} from "@/api/content";
import { followUser } from "@/api/user";
import ArticleItem3 from "@/components/ArticleItem3.vue";
import ReportModal from "@/components/ReportModal";
import Comment from "@/components/Comment.vue";
import config from "@/config/index";
import user from "@/router/rules/user";

const titleMap = new Map();

@Component({
  components: { ArticleItem3, Comment, ReportModal },
})
export default class ArticleDetail extends Vue {
  private reportShow = false;

  private sideBarLeft = "0";
  private sideBarPos = "abs1";
  private baseUrl = config.baseUrl;
  private articleId = "";
  private articleDetail: any = null;
  private recArticleList = [];
  private commentList: any = [];
  private commentSort = "likeCount";
  private canGetComment = true;
  private likeList: any = [];
  private navList: any = [];
  private slider = slidePage();
  private scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  private delModalShow = false;
  @Ref("articleContent") private articleContent!: any;
  @Ref("articleBody") private articleBody!: any;
  @Ref("leftSideBar") private leftSideBar!: any;
  @Ref("commentAnchor") private commentAnchor!: any;
  @Inject("reload") private reload!: any;

  // 监听 param变化，做好卸载重装组件的准备
  @Watch("$route")
  onRouteChange(newVal: any) {
    this.reload();
  }

  // 当前选中的 一级nav & 二级nav
  private get activeNav() {
    const h2Actives = this.navList.filter((nav: any) => {
      return nav.id <= this.scrollTop;
    });

    if (!h2Actives.length) {
      return [{ id: "xx" }, { id: "xx" }];
    }

    const h3Actives = h2Actives[h2Actives.length - 1].children.filter(
      (nav: any) => {
        return nav.id <= this.scrollTop;
      }
    );

    return [
      h2Actives[h2Actives.length - 1] || {},
      h3Actives[h3Actives.length - 1] || {},
    ];
  }
  // 当前用户是否为文章作者
  private get isAuthor() {
    return (
      this.$store.state.userInfo.usernumber ===
      this.articleDetail.author.usernumber
    );
  }
  // 题图处理
  private get bannerPic() {
    if (!this.articleDetail.banner) return "";

    if (this.articleDetail.banner.startsWith("http")) {
      return this.articleDetail.banner;
    } else {
      return this.baseUrl + this.articleDetail.banner;
    }
  }
  //作者信息
  private get author() {
    return this.articleDetail.author;
  }
  // 文章发布时间
  private get createdDate() {
    return dateFormat(this.articleDetail.created);
  }
  // 文章是否点赞
  private get articleLiked() {
    return this.articleDetail.isLiked;
  }
  // 当前允许评论的人群
  private get commentAllowers() {
    return this.articleDetail.commentAllow;
  }
  // 当前用户是否可以评论 [boolean, string]
  private get allowComment() {
    const { usernumber } = this.$store.state.userInfo;
    const result = [];

    if (usernumber === this.author.usernumber) return [true, "写下你的评论"];
    else if (this.commentAllowers === 0)
      return [false, "当前文章的评论功能已被作者关闭"];
    else if (this.commentAllowers === 1) return [true, "写下你的评论"];
    else if (this.commentAllowers === 2 && !this.author.isFollowed)
      return [false, "当前文章只允许关注作者的人进行评论"];
    else if (this.commentAllowers === 3 && !this.author.hasFollowed)
      return [false, "当前文章只允许作者关注的人进行评论"];
    else if (
      this.commentAllowers === 4 &&
      !this.author.isFollowed &&
      !this.author.hasFollowed
    )
      return [false, "当前文章只允许与作者相关注进行评论"];
    else return [true, "写下你的评论"];
  }

  // 查看、点赞、评论信息
  private get viewCount() {
    return countFormat(this.articleDetail.viewCount);
  }
  private get likeCount() {
    return countFormat(this.articleDetail.likeCount);
  }
  private get commentCount() {
    return countFormat(this.articleDetail.commentCount);
  }

  // 入口
  private async mounted() {
    const { articleId } = this.$route.params;
    this.articleId = articleId;
    const res = await this.getArticleDetail();

    if (res) return;

    await this.getRecArticle();
    await this.getCommentList(0);
    await this.getLikeList();

    // 监听窗口边框 调整左侧工具栏
    this.$nextTick(() => {
      this.resetSideBarLeft();
      this.resetSideBarLeft = this.resetSideBarLeft.bind(this);
      window.addEventListener("resize", this.resetSideBarLeft);
      window.addEventListener("scroll", this.resetSideBarPos);
      this.analysisArticleContent();
    });
  }
  private beforeDestroy() {
    // 销毁监听器
    window.removeEventListener("resize", this.resetSideBarLeft);
    window.removeEventListener("scroll", this.resetSideBarPos);
  }

  // 获取文章详情
  private async getArticleDetail() {
    const { usernumber } = this.$store.state.userInfo;
    const res = await getArticleDetail(this.articleId, usernumber);

    if (!res) {
      this.$router.replace("/whoops");
      return true;
    } else {
      this.articleDetail = res;
    }
  }
  // 获取推荐文章
  private async getRecArticle() {
    const res: any = await getRecArticle(
      this.articleDetail.articleId,
      this.articleDetail.tags,
      6
    );

    this.recArticleList = res;
  }

  // 获取评论列表
  private async getCommentList(skip: number) {
    this.canGetComment = false;
    const { usernumber } = this.$store.state.userInfo;
    const res: any = await getCommentList({
      targetId: this.articleId,
      limit: 20,
      skip,
      sort: this.commentSort,
      usernumber,
    });

    if (res) {
      this.commentList.push(...res);
    }
    this.canGetComment = true;
  }

  // 重置左侧工具栏的left属性
  private resetSideBarLeft() {
    this.sideBarLeft =
      this.articleContent.offsetLeft -
      (this.leftSideBar.clientWidth + 170) +
      "px";
  }
  // 重置两侧工具栏定位
  private resetSideBarPos() {
    const articleTop = this.articleBody.offsetTop;
    const articleHeight = this.articleBody.offsetHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const viewportHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    if (
      scrollTop >=
      articleTop +
        articleHeight -
        Math.floor(viewportHeight * 0.7) +
        this.leftSideBar.offsetHeight
    ) {
      this.sideBarPos = "abs2";
    } else if (scrollTop >= articleTop * 0.63) {
      this.sideBarPos = "fixed";
    } else {
      this.sideBarPos = "abs1";
    }

    // 更新 scrollTop 属性
    this.scrollTop = scrollTop;
  }
  // 解析文章内容中的标签栏
  private analysisArticleContent() {
    // 1. 获取所有内容标签
    const allNodes = this.articleContent.children[0].children;

    // 2. 筛选h2、h3标签
    const titleList = Array.from(allNodes).filter((node: any) => {
      return node.nodeName === "H2" || node.nodeName === "H3";
    });

    // 3. 组件目录结构
    const h2List: any = [];
    let current = 0;
    titleList.forEach((node: any) => {
      if (node.nodeName === "H2" && !h2List[current]) {
        h2List[current] = {
          id: node.offsetTop,
          val: node.textContent,
          children: [],
        };
      } else if (node.nodeName === "H2") {
        h2List[++current] = {
          id: node.offsetTop,
          val: node.textContent,
          children: [],
        };
      } else if (node.nodeName === "H3" && !h2List[current]) {
        h2List[current] = {
          id: node.offsetTop,
          val: "",
          children: [
            {
              id: node.offsetTop,
              val: node.textContent,
            },
          ],
        };
      } else if (node.nodeName === "H3") {
        h2List[current].children.push({
          id: node.offsetTop,
          val: node.textContent,
        });
      }

      titleMap.set(node.offsetTop, node);
    });

    // 4. 渲染至页面
    this.navList = h2List;
  }
  // 移动页面至对应标题处
  private toTitleHere(e: any) {
    // 1. 从冒泡路径上找到附带 data-set 的元素
    const current = e.path.filter((target: any) => {
      return target.className && target.className.includes("item");
    })[0];

    // 2. 如果没找到则直接终止
    if (!current) return;

    // 3. 移动页面至 元素身上附带的自定义高度值那里
    // 3.1 动态获取当前元素的位置
    const articleBodyTop = this.articleBody.offsetTop;
    try {
      const top = titleMap.get(Number(current.dataset.top)).offsetTop;
      top && this.slider(articleBodyTop + top - 84);
    } catch (err) {
      console.log(err);
    }
  }
  // 移动至评论区
  private toComment() {
    this.slider(this.commentAnchor.offsetTop);
  }

  // 给文章点赞
  private async likeArticle() {
    const res = await addLike(this.articleDetail.articleId, 0);

    if (typeof res === "object") {
      this.$Message.success("点赞成功");
      this.articleDetail.likeCount++;
      this.articleDetail.isLiked = 1;
    } else if (res !== false) {
      this.$Message.info(res);
      this.articleDetail.likeCount--;
      this.articleDetail.isLiked = 0;
    }

    // 重新加载点赞列表
    this.getLikeList();
  }

  // 删除文章
  private async delArticle() {
    const res = await delArticle(this.articleDetail.articleId);

    if (!res) {
      return this.$Message.error("删除失败");
    }

    this.$Message.success("成功删除文章");
    this.$router.replace(
      `/user/${this.$store.state.userInfo.usernumber}/article`
    );
  }

  // 修改文章
  private async modifyArticle() {
    const { title, content, banner, words } = this.articleDetail;
    const draftId = this.articleDetail.articleId;

    // 1. 查询草稿是否存在，如果存在直接跳转
    const isExist = await existDraft(draftId);
    if (isExist) return this.$router.push(`/draft/${draftId}`);

    // 2. 不存在新建草稿后再跳转
    const res = await saveDraft({
      draftId,
      title,
      content,
      banner,
      words,
    });

    if (!res) {
      return this.$Message.error("操作失败");
    }
    this.$router.push(`/draft/${draftId}`);
  }

  // 获取给文章点赞的列表
  private async getLikeList() {
    const res = await getLikeList(this.articleId, 5);

    this.likeList = res;
  }

  // 收藏文章
  private async collectArticle() {
    const res = await addCollection(this.articleDetail.articleId);

    if (typeof res === "object") {
      this.$Message.success("收藏成功");
      this.articleDetail.isCollected = 1;
    } else {
      this.$Message.info(res);
      this.articleDetail.isCollected = 0;
    }
  }

  // 关注用户
  private async followUser() {
    const res = await followUser(this.author.usernumber);

    if (typeof res === "object") {
      this.$Message.success("关注成功");
      this.author.isFollowed = 1;
    } else if (typeof res === "string") {
      this.$Message.info(res);
      this.author.isFollowed = 0;
    }
  }

  // 分享文章至QQ
  private shareToQQ() {
    window.open(
      `http://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}&sharesource=qzone&title=TIFA COMMUNITY&pics=${this.articleDetail.banner}&summary=${this.articleDetail.title}&desc=TIFA`
    );
  }

  // 设置允许评论的类型
  private async setCommentAllow(type: number) {
    const res = await setArticleCommentAllow(this.articleId, type);

    if (!res) return;

    this.$Message.success("设置成功");
    this.articleDetail.commentAllow = type;
  }
}
</script>

<style lang="scss">
.article-detail-outermost {
  .article-header {
    position: relative;
    padding-top: 20px;
    z-index: 5;

    .gray-bg-box {
      width: 100%;
      height: 280px;
      background: linear-gradient(0deg, #f4f4f4, #f4f4f4);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .article-banner {
      width: 710px;
      min-height: 354px;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .article-title-box {
      width: 100%;
      max-width: 664px;
      margin: 0 auto;

      .article-title {
        margin: 40px auto 30px;
        font-weight: 500;
        font-size: 28px;
        line-height: 42px;
        color: #292525;
      }

      .article-author {
        position: relative;
        margin-bottom: 60px;
        display: flex;
        justify-content: space-between;

        .author-box {
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            border-radius: 100%;
          }

          .name {
            color: #292525;
            margin-left: 10px;
          }
        }

        .timer {
          color: $contentColor;
        }
      }
    }
  }

  .article-body {
    position: relative;
    min-height: 340px;

    .article-content {
      width: 100%;
      max-width: 664px;
      min-height: 340px;
      margin: 0 auto;
      color: #4c4e4d;
      font-size: 16px;
      letter-spacing: 0.2px;

      @import "@/config/articleTheme.scss";
    }

    .article-left-side {
      transform: translateY(0);
      bottom: auto;
      text-align: center;
      z-index: 90;
      color: $contentColor;

      .like-btn {
        margin-bottom: 8px;
        width: 48px;
        height: 48px;
        font-size: 26px;
      }

      .count {
        font-size: 12px;
        line-height: 17px;
      }

      .item {
        margin-top: 20px;

        i {
          cursor: pointer;
        }

        i:hover {
          color: $primaryColor;
        }
      }

      .is-collected {
        color: $primaryColor;
      }
    }

    .article-right-side {
      position: absolute;
      top: 0;
      transform: translateY(0);
      bottom: auto;
      right: 40px;
      z-index: 90;
      padding: 10px 0;
      width: 250px;
      padding-left: 40px;
      max-height: 400px;
      margin-top: -10px;
      overflow: hidden;

      &:hover {
        overflow: auto;
      }

      .directory-container {
        .item {
          margin-bottom: 10px;
          text-align: left;
          cursor: pointer;

          .circle {
            width: 16px;
            height: 4px;
            border-radius: 20px;
            background: #e5e5e5;
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            transition: background 0.5s;

            &.h3 {
              width: 10px;
              height: 4px;
              margin-right: 2px;
            }
          }

          .title {
            font-size: 12px;
            line-height: 17px;
            color: $contentColor;
            display: inline-block;
            opacity: 0;
            width: 150px;
            vertical-align: middle;
            text-align: left;
            transition: opacity 0.5s;
            margin-top: -2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 10px;
            font-weight: 600;
          }

          &:hover {
            .circle {
              background-color: #8e8787;
            }

            .title {
              color: #655e5e;
            }
          }
        }

        .active-nav {
          .circle {
            background-color: #8e8787;
          }

          .title {
            color: #655e5e;
            opacity: 1;
          }
        }

        .sub-directory {
          .title {
            margin-left: 8px;
            font-weight: 400;
          }

          &:hover {
            .title {
              color: #292525;
            }
          }
        }

        &:hover .title {
          opacity: 1;
        }
      }
    }

    .side-fixed,
    .side-r-fixed {
      position: fixed;
      top: 30%;
    }

    .side-abs1,
    .side-r-abs1 {
      position: absolute;
      top: 0;
      bottom: auto;
    }

    .side-abs2 {
      position: absolute;
      top: auto;
      bottom: 0;
    }

    .side-r-abs2 {
      display: none;
    }
  }

  .article-tag {
    width: 100%;
    max-width: 687px;
    margin: 60px auto 0;

    .tag-container {
      margin: -8px;

      .tag-item {
        padding: 8px;
        display: inline-block;

        .tag {
          font-size: 12px;
          line-height: 17px;
          letter-spacing: 0.05em;
          color: #655e5e;
          padding: 5px 10px;
          background: #f5f5f5;

          span {
            font-weight: 300;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: 0.1em;
            color: #8e8787;
            margin-right: 2px;
          }
        }
      }
    }
  }

  .article-action-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 687px;
    margin: 30px auto 0;

    .like-btn {
      padding: 10px 0;
      transition: background 0.5s;
      margin-right: 30px;
    }

    .liked-users {
      flex: 1;

      .pic-item {
        display: inline-block;
        border: 1px solid #fff;
        margin-left: -4px;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        position: relative;
        line-height: 1;

        img {
          width: 16px;
          height: 16px;
          border-radius: 100%;
        }

        &:first-child {
          margin-left: 0;
        }
      }

      .tip-info {
        font-size: 12px;
        line-height: 17px;
        color: #8e8787;
        margin-top: 4px;
        .nickname {
          display: inline-block;

          a {
            color: #292525;
            &:hover {
              color: $primaryColor;
            }
          }
        }

        .text {
          margin-left: 3px;
        }
      }
    }

    .right {
      display: flex;

      .oper-item {
        width: 40px;
        height: 40px;
        color: $contentColor;
        transition: 0.3s;
        line-height: 40px;
        text-align: center;

        i {
          cursor: pointer;
        }

        i:hover {
          color: $primaryColor;
        }
      }

      .is-collected {
        color: $primaryColor;
      }
    }
  }

  .line {
    width: 100%;
    max-width: 687px;
    height: 1px;
    background: #e5e5e5;
    margin: 30px auto;
  }

  .article-author {
    width: 100%;
    max-width: 687px;
    margin: 0 auto;
    padding-bottom: 30px;

    .author-container {
      .author-center {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 410px;
        display: flex;

        .author-pic {
          height: 42px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;

          img {
            width: 42px;
            height: 42px;
            border-radius: 100%;
          }
        }

        .content {
          padding-left: 20px;
          flex: 1;

          .top {
            display: inline-flex;
            align-items: center;

            a {
              font-weight: 500;
              font-size: 18px;
              line-height: 25px;
              color: #292525;

              &:hover {
                color: $primaryColor;
              }
            }
          }

          .summary {
            font-size: 14px;
            line-height: 20px;
            color: $contentColor;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 40px;
          }

          /* .follow-btn {
          } */
        }
      }
    }
  }

  .bg-grey {
    background: #f4f4f4;
    padding: 40px 0;

    .advertisement-box {
      margin-bottom: 40px;
      margin-top: 0;
      width: 100%;
      max-width: 548px;
      margin: 0 auto;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      overflow: hidden;

      img {
        width: 100%;
        max-width: 548px;
        max-height: 126px;
      }
    }

    .recommend-read {
      width: 100%;
      max-width: 832px;
      margin: 30px auto 0;

      .header {
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.06em;
        color: #655e5e;
        margin-bottom: 30px;
      }

      .read-container {
        width: 100%;
        max-width: 832px;
        .article-card {
          padding: 6px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
