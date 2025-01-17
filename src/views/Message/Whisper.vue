<template>
  <div class="message-whisper-outermost">
    <div class="whisper-left">
      <div class="w-title">近期消息</div>
      <div class="w-tab-list">
        <Scroll :onReachBottom="getRoomList" :isEnd="roomIsEnd">
          <div
            class="w-tab-item"
            v-for="(room, index) in roomList"
            :key="room.roomId"
            :class="{ 'w-active': room.roomId === curTab }"
            @click="switchTab(room.roomId)"
          >
            <Badge
              :count="room.newMsgCount"
              :type="room.undisturb ? 'normal' : 'error'"
              :offset="[0, 10]"
            >
              <Avatar class="w-avatar" size="42" :src="room.opposite.pic" />
            </Badge>
            <div class="w-info">
              <div class="w-name">{{ room.opposite.name }}</div>
              <div class="w-tip" v-if="room.lastMsg">
                {{
                  room.lastMsg.type === 1
                    ? "[图片]"
                    : filteTabMsg(room.lastMsg.content)
                }}
              </div>
            </div>
            <!-- 关闭 -->
            <div
              class="w-close-box"
              title="关闭该私信窗口"
              @click.stop="setRoomShow(index, room.roomId)"
            >
              <Icon type="md-close" size="18" />
            </div>
            <!-- 是否置顶 -->
            <div class="w-top-box" v-if="room.topping">
              <Icon type="ios-lock-outline" size="18" />
            </div>
          </div>
        </Scroll>
      </div>
    </div>

    <div class="whisper-right">
      <p v-if="!curRoom.roomId">放图片的地方</p>
      <div class="right-wrap" v-else>
        <div class="w-title">
          {{ curRoom.opposite.name }}
          <div class="w-other">
            <Dropdown trigger="click">
              <Icon class="w-icon" type="ios-more" size="24" />

              <DropdownMenu slot="list">
                <DropdownItem
                  v-if="!curRoom.topping"
                  @click.native="setRoomTop(1)"
                  >置顶</DropdownItem
                >
                <DropdownItem v-else @click.native="setRoomTop(0)"
                  >取消置顶</DropdownItem
                >
                <DropdownItem @click.native="setUndisturb"
                  >{{ curRoom.undisturb ? "关闭" : "开启" }}免打扰</DropdownItem
                >
                <DropdownItem>加入黑名单</DropdownItem>
                <DropdownItem @click.native="reportOppositeShow = true"
                  >举报该用户</DropdownItem
                >
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div
          class="w-content"
          v-contextmenu="{
            撤回消息: {
              valid: (value) => value === 'me',
              cb: withdrawWhisper,
            },
            举报消息: {
              valid: (value) => value === 'oppo',
              cb: reportWhisper,
            },
            删除消息: deleteWhisper,
          }"
        >
          <Scroll
            at="bottom"
            :onReady="whisperSliderReady"
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
              :whisperId="msgObj.whisperId"
              :onImgLoad="scrollWhisperToBottom"
            />
          </Scroll>
        </div>
        <div class="w-input">
          <ReplyArea
            @keydown.ctrl.enter="addWhisper()"
            @onSubmit="addWhisper"
            :value.sync="inputVal"
            autoFlow
            height="90"
            placeholder="回复一下吧~"
            toolsReverse
            :uploadSuc="uploadSuc"
          />
        </div>
      </div>

      <!-- 单条私信举报对话框 -->
      <ReportModal
        chat
        :targetId="curReportWhisperId"
        :show.sync="whisperReportShow"
        :type="3"
      />
      <!-- 用户违规私信举报对话框 -->
      <ReportModal
        chat
        :targetId="this.curTab"
        :show.sync="reportOppositeShow"
        :type="4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { filteHTML, filteImg } from "@/utils/index";
import {
  getRoomList,
  getWhisperList,
  addWhisper,
  setIsRead,
  setRoomShow,
  setRoomTop,
  withdrawWhisper,
  deleteWhisper,
  setUndisturb,
} from "@/api/content";
import Avatar from "@/components/Avatar.vue";
import ReplyArea from "@/components/ReplyArea.vue";
import WhisperItem from "./WhisperItem.vue";
import ReportModal from "@/components/ReportModal";

@Component({
  components: { Avatar, ReplyArea, WhisperItem, ReportModal },
})
export default class MessageWhisper extends Vue {
  // 左侧窗口列表控制变量
  private roomList: any = [];
  private curTab = "";
  private roomSkip = 0;
  private roomIsEnd = false;
  private topers = 0; // 置顶的数量
  private curRoomIndex = -1;
  private reportOppositeShow = false;
  // 右侧私信内容控制变量
  private whisperList: any = [];
  private inputVal = "";
  private whisperSkip = 0;
  private whisperIsEnd = false;
  private threshold = 1000 * 60 * 5;
  private whisperScrollTo: null | Function = null;
  private newWhisperCount = 0;
  private curReportWhisperId = "";
  private whisperReportShow = false;

  // 自己的账号
  private get self() {
    return this.$store.state.userInfo.usernumber;
  }
  // 当前选中的房间对象
  private get curRoom() {
    return (
      this.roomList.filter((room: any, index: number) => {
        room.roomId === this.curTab && (this.curRoomIndex = index);

        return room.roomId === this.curTab;
      })[0] || {}
    );
  }

  // 入口
  private created() {
    this.init();
  }

  // 初始化
  private async init() {
    const { wid } = this.$route.params;
    wid && (this.curTab = wid);

    this.getRoomList();
    wid && (await this.getWhisperList());

    // 监听新消息
    this.installEventBus();
  }
  // 获取私信窗口列表
  private async getRoomList() {
    const res: any = await getRoomList(this.roomSkip++);
    this.roomList.push(...res);

    // 计算topers数量
    this.topers = this.roomList.filter((room: any) => room.topping).length;

    if (!res[0]) this.roomIsEnd = true;
  }
  // 获取私信内容列表
  private async getWhisperList() {
    const res: any = await getWhisperList(
      this.curTab,
      this.whisperSkip++ * 20 + this.newWhisperCount
    );
    this.whisperList.unshift(...res);

    if (!res[0]) this.whisperIsEnd = true;

    // 设置时间组
    this.setWhisperTime(this.whisperList);
    // 设置已读
    this.whisperSkip === 1 && this.setIsRead();

    return res.length;
  }
  // 切换Tab
  private async switchTab(wid: string) {
    if (wid === this.curTab) return;

    // 1. 切换左侧状态栏
    this.$router.replace(wid);
    this.curTab = wid;

    // 2. 清空私信列表 & 清0跳过的页数 & 重新打开上拉加载 & 加载私信列表 & 清空新消息数
    this.whisperList = [];
    this.whisperSkip = 0;
    this.whisperIsEnd = false;
    this.getWhisperList();
    this.newWhisperCount = 0;
  }
  // 过滤提示信息
  private filteTabMsg(str: string) {
    return filteHTML(filteImg(str, "[图片]"));
  }
  // 设置时间组
  private setWhisperTime(whisperList: any, msg: any = false) {
    // 给单一消息设置时间组
    if (msg) {
      // 判断是否展示时间
      const msgCreated: any = (msg.created = new Date(msg.created));
      const lastMsgCreated = whisperList.length
        ? whisperList[whisperList.length - 1].created
        : 0;
      if (msgCreated - lastMsgCreated < this.threshold) {
        msg.createdShow = false;
      }
      return;
    }

    let lastWhisperCreated = 0;
    const threshold = this.threshold;

    whisperList.forEach((whisper: any) => {
      whisper.created = new Date(whisper.created);
      // 如果该条消息的创建时间比上条消息的晚5分钟以内，则隐藏该条消息的时间
      if (whisper.created - lastWhisperCreated < threshold) {
        whisper.createdShow = false;
      }

      lastWhisperCreated = whisper.created;
    });
  }
  // 私信滚动条初始化完毕
  private whisperSliderReady(tools: any) {
    const { scrollTo } = tools;
    this.whisperScrollTo = scrollTo;
  }
  // 发送私信
  private async addWhisper(content = this.inputVal, type = 0) {
    if (content === "") return;

    const res: any = await addWhisper(
      this.curRoom.oppositeId,
      this.curRoom.roomId,
      content,
      type
    );

    if (res) {
      // 清空输入框 & 清空提示
      this.inputVal = "";
      this.setIsRead();
      // 后置操作
      this.addedWhisper(res);
    }
  }
  // 设置已读
  private async setIsRead() {
    setTimeout(() => {
      this.curRoom.newMsgCount && setIsRead(4, this.curTab);
      this.curRoom.newMsgCount = 0;
    });
  }
  // 监听EventBus带来的消息
  private async installEventBus() {
    // 监听新消息（消息来自vuex）
    (this as any).$bus.$on("hasNewMsg", (msg: any) => {
      console.log(msg);
      // 获取消息对应的room & 消息
      const room = this.getRoomById(msg.roomId)[0];

      // 判断是否为撤回消息
      if (msg.type === "withdraw") {
        room.newMsgCount && room.newMsgCount--;
        room.lastMsg = msg;

        // 要撤回消息的房间是否为当前房间
        console.log(room === this.curRoom, room, this.curRoom);
        if (room === this.curRoom) {
          const whisper: any = this.getWhisperById(msg.whisperId)[0];
          whisper.status = 0;
          whisper.content = "对方撤回了一条消息";
        }

        return;
      }

      // 提示总数++
      room.newMsgCount++;
      // 后置操作
      this.addedWhisper(msg);
    });
  }
  // 关闭窗口
  private async setRoomShow(index: number, roomId: string) {
    const res = await setRoomShow(roomId, 0);
    if (!res) return;

    this.roomList.splice(index, 1);
    // 当前打开的窗口是否要被删除的窗口
    if (this.curTab === roomId) {
      this.$router.replace("/message/whisper/");
      this.curTab = "";
    }
  }
  // 置顶窗口
  private async setRoomTop(topping: number) {
    const res: any = await setRoomTop(this.curRoom.roomId, topping);

    if (!res) return;

    topping ? this.topers++ : this.topers--;
    this.curRoom.topping = topping;
    this.moveRoom(this.curRoomIndex);
  }
  // 移动窗口到自己能到达的顶部位置
  private moveRoom(curRoomIndex: number) {
    const curRoom = this.roomList.splice(curRoomIndex, 1)[0];

    if (curRoom.topping) {
      this.roomList.unshift(curRoom);
    } else {
      this.roomList.splice(this.topers, 0, curRoom);
    }
  }
  // 移动对话框到最下方
  private scrollWhisperToBottom(transition = false) {
    typeof transition !== "boolean" && (transition = false);

    this.whisperScrollTo && this.whisperScrollTo("bottom", transition);
  }
  // 添加私信后（不管是谁发的）的后置操作
  private addedWhisper(msg: any) {
    // 如果消息为当前的窗口:(添加数据 & 新消息++ & 滚动到底部 & 设置时间组)
    if (msg.roomId === this.curTab) {
      this.newWhisperCount++;
      this.whisperList.push(msg);
      const hasTransition = msg.type === 1 ? false : true;
      this.scrollWhisperToBottom(hasTransition);
      this.setWhisperTime(this.whisperList, msg);
    }
    // 消息对应的房间和索引 & 移动窗口 & 设置room底部提示为最新消息
    const [room, roomIndex] = this.getRoomById(msg.roomId);
    this.moveRoom(roomIndex);
    room.lastMsg = msg;
  }
  // 通过roomId找到对应的room房间：[房间，房间索引]
  private getRoomById(roomId: string) {
    let resultIndex = -1;
    const result =
      this.roomList.filter((room: any, index: number) => {
        room.roomId === roomId && (resultIndex = index);

        return room.roomId === roomId;
      })[0] || {};

    return [result, resultIndex];
  }
  // 通过whisperId找到对应的私信：[私信对象，私信索引]
  private getWhisperById(whisperId: string) {
    let resultIndex = -1;
    const result =
      this.whisperList.filter((whisper: any, index: number) => {
        whisper.whisperId === whisperId && (resultIndex = index);

        return whisper.whisperId === whisperId;
      })[0] || {};

    return [result, resultIndex];
  }
  // 撤回消息
  private async withdrawWhisper(whisperId: string) {
    const whisper =
      this.whisperList.filter((whisper: any) => {
        return whisper.whisperId === whisperId;
      })[0] || {};

    // 超过2分钟了
    if (whisper.created.getTime() < Date.now() - 120000)
      return this.$Message.error("超过2分钟的消息无法撤回");

    const res = await withdrawWhisper(whisperId);

    if (!res) return;
    whisper.status = 0;
    whisper.content = "您撤回了一条消息";
    // 通知对方撤回了消息：在eventBus中判断数据类型，（如果有）减去1个提示状态，将设置msg的status和content
  }
  // 删除私信
  private async deleteWhisper(whisperId: string) {
    const res = await deleteWhisper(whisperId);

    if (res) {
      this.newWhisperCount--;
      const whisperIndex = this.getWhisperById(whisperId)[1];
      this.whisperList.splice(whisperIndex, 1);
      this.$Message.success("删除成功，该消息将不在您的对话框中展示");
    }
  }
  // 举报私信
  private reportWhisper(whisperId: string) {
    this.curReportWhisperId = whisperId;
    this.whisperReportShow = true;
  }
  // 上传图片
  private uploadSuc({ data }: { data: any }) {
    if (data.uploaded) {
      this.addWhisper(data.url, 1);
    }
  }
  // 设置单个窗口消息免打扰
  private async setUndisturb() {
    const undisturb = this.curRoom.undisturb ? 0 : 1;
    const res = await setUndisturb(this.curTab, undisturb);

    if (res) {
      this.curRoom.undisturb = undisturb;
    }
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

        &:hover {
          background-color: #e4e5e6;

          .w-close-box {
            transform: translate(0%, -50%);
          }
        }

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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 150px;
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

        .w-close-box {
          position: absolute;
          top: 50%;
          transform: translate(-130%, -50%);
          transition: 0.3s ease;
          left: 5px;
          color: red;
        }

        .w-top-box {
          position: absolute;
          top: 5px;
          left: 5px;
        }
      }

      .w-active {
        background-color: #e4e5e6;
      }
    }
  }

  .whisper-right {
    flex: 1;
    width: 590px;
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

      .w-other {
        position: absolute;
        right: 5px;
        cursor: pointer;

        .w-icon {
          transform: rotate(90deg);
        }
      }
    }

    .w-content {
      flex: 1;
      position: relative;
      height: calc(100% - 36px - 162px);

      .emoji-size-small {
        width: 24px;
        height: 24px;
        vertical-align: text-bottom;
      }

      .emoji-size-big {
        width: 40px;
        height: 40px;
        vertical-align: text-bottom;
      }
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
