<template>
  <Modal
    v-model="modalShow"
    class-name="vertical-middle-modal"
    width="400"
    class="reset-modal"
  >
    <!-- 头部 -->
    <template #header>
      <div class="report-modal-header">
        <p class="title">举报</p>
        <p class="sub-title">请选择举报理由</p>
      </div>
    </template>
    <!-- 内容 -->
    <template>
      <div class="report-modal-list" @click="toInputReport" v-if="!contentShow">
        <div
          class="report-item"
          v-for="(category, index) in categoryList"
          :key="category.category"
          :data-index="index"
        >
          <p>{{ category.name }}</p>
          <Icon type="ios-arrow-forward" size="18" />
        </div>
      </div>
      <div class="report-content-box" v-else>
        <Input
          class="report-input"
          v-model="content"
          type="textarea"
          placeholder="举报详细说明（选填）"
          maxlength="150"
        />
      </div>
    </template>
    <!-- 底部 -->
    <template #footer>
      <div class="report-footer" v-if="contentShow">
        <div class="report-oper-box">
          <div class="item back"><Button long @click="back">返回</Button></div>
          <div class="item report">
            <Button type="primary" long @click="report">举报</Button>
          </div>
        </div>
        <div class="report-sketch">
          <p v-if="chat !== false && type === 4">
            由于需要对该用户违规行为进行审核参考，所以该对话近期内的消息将作为证据一并提交。
          </p>
          <p v-else-if="chat !== false">
            针对单一私信记录，社区只会根据举报信息来进行审核，不会随意翻阅您的其他私人对话记录。
          </p>
          <p v-else>{{ categoryList[current].sketch }}</p>
        </div>
      </div>
      <div v-else></div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { selectEle } from "@/utils/index";
import { addReport } from "@/api/content";

@Component
export default class ReportModal extends Vue {
  @Prop({ default: false }) private show!: boolean;
  @Prop({ default: 0 }) private type!: number;
  @Prop({ default: "" }) private targetId!: string;
  @Prop({ default: false }) private user!: boolean; // 是否开启用户举报
  @Prop({ default: false }) private chat!: boolean; // 是否开启私信举报

  private contentShow = false;
  // 当前选中的条目
  private current = "0";
  // 当前的举报类型
  private category: string | number = "0";
  private content = "";
  // 文章等内容信息举报类型
  private categoryListContent = [
    {
      category: 0,
      name: "垃圾广告信息",
      sketch:
        "未经平台允许，禁止使用帐号的任何功能，发布含有产品售卖信息、牟利性外链及违规推广等信息或引导用户至第三方平台进行交易。请在举报时简述理由，感谢您与我们共同维护社区的良好氛围。",
    },
    {
      category: 1,
      name: "不实信息",
      sketch:
        "社区禁止对标榜真实事件的内容进行恶意夸大或过分虚构的行为。请在举报时提供被举报内容中编造经历的佐证，如事实错误、前后矛盾等相关内容段落或其他详细信息。感谢您与我们共同维护社区真实的内容环境。",
    },
    {
      category: 2,
      name: "辱骂、人身攻击等不友善行为",
      sketch:
        "社区鼓励友善的讨论。请在举报时提供对人产生辱骂、人身攻击或冒犯的相关内容段落或其他信息。感谢您与我们共同维护社区的讨论氛围。",
    },
    {
      category: 3,
      name: "有害信息",
      sketch:
        "社区严厉禁止发布一切会对社会造成不良影响的，包括但不限于涉及到黄赌毒的有害信息，感谢您与我们共同维护社区的秩序",
    },
    {
      category: 4,
      name: "不规范转载",
      sketch:
        "社区鼓励对引用内容进行清晰的出处标注。请在举报时提供违规引用的内容链接或出处，感谢您与我们共同保护原创版权。",
    },
    {
      category: 5,
      name: "涉嫌侵权",
      sketch: "您提交的侵权举报将会根据社区侵权举报规范进行受理",
    },
    {
      category: 6,
      name: "诱导赞同、关注等行为",
      sketch:
        "社区禁止通过各种方式比如利益诱导（赞同、反对、分享行为后对用户有奖励）、威胁逼迫等形式干预用户在社区站内的赞同、关注等，影响内容在站内正常流通。请在举报时简述理由，感谢您与我们共同维护社区氛围。",
    },
  ];
  // 用户举报类型
  private categoryListUser = [
    {
      category: 7,
      name: "冒充我或他人",
      sketch:
        "当您发现社区上存在涉嫌侵犯您个人合法权益的内容时，您可以立马向我们提出诉求，请在举报时阐述相关细节，我们会尽快核实并做出处理。",
    },
    {
      category: 8,
      name: "垃圾广告账号",
      sketch:
        "未经平台允许，社区禁止使用帐号的任何功能发布含有产品售卖信息、牟利性外链及违规推广等信息或引导用户至第三方平台进行交易。请在举报时简述理由，感谢您与我们共同维护社区的良好氛围。",
    },
    {
      category: 9,
      name: "个人信息不符合规范",
      sketch:
        "用户名、头像、封面图、个人形象词包含联系方式；或高风险行业帐号的用户信息中包含联系方式；或用户名易与帐号使用状态、使用者身份产生混淆和误解。请在举报时简述原因，感谢您的支持。",
    },
  ];
  // 私信举报类型
  private categoryListChat = [
    {
      category: 10,
      name: "色情低俗",
    },
    {
      category: 11,
      name: "政治敏感",
    },
    {
      category: 12,
      name: "违法有害",
    },
    {
      category: 13,
      name: "广告骚扰",
    },
    {
      category: 14,
      name: "人身攻击",
    },
    {
      category: 15,
      name: "诈骗",
    },
    {
      category: 16,
      name: "其他问题",
    },
  ];

  // 当前用作渲染的类型列表
  private get categoryList() {
    if (this.user !== false) {
      return this.categoryListUser;
    }

    if (this.chat !== false) {
      return this.categoryListChat;
    }

    return this.categoryListContent;
  }

  private get modalShow() {
    return this.show;
  }
  private set modalShow(newVal: boolean) {
    this.$emit("update:show", newVal);
  }

  // 点及举报类型后，输入举报内容
  private toInputReport(e: any) {
    // 1. 查询冒泡序列上的 dataset
    const box = selectEle(e.path, "index");
    if (!box) return;

    const { index } = box.dataset;

    // 2. 赋值 category，current， 打开contentShow
    this.category = this.categoryList[index].category;
    this.current = index;
    this.contentShow = true;
  }

  // 返回至 选择举报类型
  private back() {
    this.category = "";
    this.content = "";
    this.contentShow = false;
  }

  // 举报
  private async report() {
    const res: any = await addReport({
      type: this.type,
      category: this.category,
      targetId: this.targetId,
      content: this.content,
    });

    this.$Message.success(res);
    this.category = "";
    this.content = "";
    this.contentShow = false;
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss">
.report-modal-header {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;

  p {
    height: auto;
    line-height: 1;
  }

  .title {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 500;
    color: #121212;
    text-align: center;
  }

  .sub-title {
    padding: 0 38px;
    margin-top: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: #8590a6;
    text-align: center;
  }
}

.report-modal-list {
  .report-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;

    &:last-child {
      border: none;
    }
  }
}

.report-content-box {
  .report-input {
    margin-bottom: 20px;

    textarea {
      resize: none;
      height: 130px;
    }
  }
}

.report-footer {
  .report-oper-box {
    display: flex;

    .item {
      flex: 1;
    }

    .back {
      margin-right: 20px;
    }
  }

  .report-sketch {
    margin: 30px 0 10px 0;
    font-size: 14px;
    color: #999;
    text-align: left;
  }
}

.vertical-middle-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  .ivu-modal {
    top: 0;
  }
}

.reset-modal {
  .ivu-modal-header,
  .ivu-modal-footer {
    border: none;
  }
}
</style>
