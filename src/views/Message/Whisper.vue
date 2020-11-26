<template>
  <div class="message-whisper-outermost">
    <div class="whisper-left">
      <div class="w-title">近期消息</div>
      <div class="w-tab-list">
        <Scroll :onReachBottom="getRoomList" :isEnd="roomIsEnd">
          <div
            class="w-tab-item"
            v-for="room in roomList"
            :key="room.roomId"
            :class="{ 'w-active': room.roomId === curTab }"
            @click="switchTab(room.roomId)"
          >
            <Avatar class="w-avatar" size="42" :src="room.opposite.pic" />
            <div class="w-info">
              <div class="w-name">{{ room.opposite.name }}</div>
              <div class="w-tip">
                {{ filteTabMsg(room.lastMsg.content) }}
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>

    <div class="whisper-right">
      <p v-if="!curRoom.roomId">放图片的地方</p>
      <div class="right-wrap" v-else>
        <div class="w-title">{{ curRoom.opposite.name }}</div>
        <div class="w-content">
          <Scroll
            at="bottom"
            :onReachTop="getWhisperList"
            :isEnd="whisperIsEnd"
            v-if="whisperList[0]"
          >
            <WhisperItem
              v-for="msgObj in whisperList"
              :key="msgObj.whisperId"
              :me="msgObj.authorId === self"
              :type="msgObj.type"
              :status="msgObj.status"
              :opposite="curRoom.opposite"
              :content="msgObj.content"
              :createdShow="msgObj.createdShow"
              :created="msgObj.created"
            />
          </Scroll>
        </div>
        <div class="w-input">
          <ReplyArea
            @onSubmit="1"
            :value.sync="inputVal"
            autoFlow
            height="90"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { filteHTML, filteImg } from "@/utils/index";
import { getRoomList, getWhisperList } from "@/api/content";
import Avatar from "@/components/Avatar.vue";
import ReplyArea from "@/components/ReplyArea.vue";
import WhisperItem from "./WhisperItem.vue";

@Component({
  components: { Avatar, ReplyArea, WhisperItem },
})
export default class MessageWhisper extends Vue {
  // 左侧窗口列表控制变量
  private roomList: any = [];
  private curTab = "";
  private roomSkip = 0;
  private roomIsEnd = false;
  // 右侧私信内容控制变量
  private whisperList: any = [];
  private inputVal = "";
  private whisperSkip = 0;
  private whisperIsEnd = false;

  // 自己的账号
  private get self() {
    return this.$store.state.userInfo.usernumber;
  }
  // 当前选中的房间对象
  private get curRoom() {
    return (
      this.roomList.filter((room: any) => {
        return room.roomId === this.curTab;
      })[0] || {}
    );
  }

  // 入口
  private created() {
    const { wid } = this.$route.params;
    wid && (this.curTab = wid);

    this.getRoomList();
    wid && this.getWhisperList();
  }

  // 获取私信窗口列表
  private async getRoomList() {
    const res: any = await getRoomList(this.roomSkip++);
    this.roomList.push(...res);

    if (!res[0]) this.roomIsEnd = true;
  }
  // 获取私信内容列表
  private async getWhisperList() {
    const res: any = await getWhisperList(this.curTab, this.whisperSkip++);
    this.whisperList.unshift(...res);

    if (!res[0]) this.whisperIsEnd = true;

    // 设置时间组
    this.setWhisperTime(this.whisperList);
  }
  // 切换Tab
  private async switchTab(wid: string) {
    if (wid === this.curTab) return;

    // 1. 切换左侧状态栏
    this.$router.replace(wid);
    this.curTab = wid;

    // 2. 清空私信列表 & 清0跳过的页数 & 启动上拉刷新 & 加载私信列表
    this.whisperList = [];
    this.whisperSkip = 0;
    this.whisperIsEnd = false;
    this.getWhisperList();
  }
  // 过滤提示信息
  private filteTabMsg(str: string) {
    return filteHTML(filteImg(str, "[图片]"));
  }
  // 设置时间组
  private setWhisperTime(whisperList: any) {
    let lastWhisperCreated = 0;
    const threshold = 1000 * 60 * 5;

    whisperList.forEach((whisper: any) => {
      whisper.created = new Date(whisper.created);
      // 如果该条消息的创建时间比上条消息的晚5分钟以内，则隐藏该条消息的时间
      if (whisper.created - lastWhisperCreated < threshold) {
        whisper.createdShow = false;
      }

      lastWhisperCreated = whisper.created;
    });
  }
}
</script>

<style lang="scss">
.message-whisper-outermost {
  height: calc(100% - 3px);
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  display: flex;

  .whisper-left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e9eaec;

    .w-title {
      background-color: #fff;
      font-size: 14px;
      color: $contentColor;
      padding-left: 24px;
      line-height: 35px;
      height: 36px;
      border-bottom: 1px solid #e9eaec;
      user-select: none;
      overflow: hidden;
    }

    .w-tab-list {
      background-color: #fff;
      height: calc(100% - 36px);
      overflow: auto;

      .w-tab-item {
        width: 100%;
        display: flex;
        padding: 19px 24px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        .w-avatar {
          margin-right: 8px;
        }

        .w-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.3;

          .w-name {
            color: #333;
          }
          .w-tip {
            color: $contentColor;
            font-size: 12px;
            overflow: hidden;
            width: 155px;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 8px 0;
          }
        }
      }

      .w-active {
        background-color: #e4e5e6;
      }
    }
  }

  .whisper-right {
    flex: 1;
    height: 100%;

    .right-wrap {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .w-title {
      background-color: #fff;
      height: 36px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e9eaec;
      position: relative;
      text-align: center;
      color: #333;
    }

    .w-content {
      flex: 1;
      position: relative;
      height: calc(100% - 36px - 162px);
    }

    .w-input {
      height: 162px;
      border-top: 1px solid #d8d8d8;
      border-bottom-right-radius: 4px;
      flex-shrink: 0;
      padding: 10px 16px 0;
      position: relative;
      z-index: 2;
    }
  }
}
</style>
