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
          v-for="category in categoryList"
          :key="category.category"
          :data-category="category.category"
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
          <div class="item back"><Button long>返回</Button></div>
          <div class="item report">
            <Button type="primary" long>举报</Button>
          </div>
        </div>
        <div class="report-sketch">
          <p>{{ categoryList[category].sketch }}</p>
        </div>
      </div>
      <div v-else></div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { selectEle } from "@/utils/index";

@Component
export default class ReportModal extends Vue {
  @Prop({ default: false }) private show!: boolean;

  private contentShow = false;
  private category = "0";
  private content = "";
  private categoryList = [
    {
      category: 0,
      name: "垃圾广告信息",
      sketch:
        "未经平台允许，禁止使用帐号的任何功能，发布含有产品售卖信息、牟利性外链及违规推广等信息或引导用户至第三方平台进行交易。请在举报时简述理由，感谢你与我们共同维护社区的良好氛围。",
    },
    {
      category: 1,
      name: "不实信息",
    },
    {
      category: 2,
      name: "辱骂、人身攻击等不友善行为",
    },
    {
      category: 3,
      name: "有害信息",
    },
    {
      category: 4,
      name: "不规范转载",
    },
    {
      category: 5,
      name: "涉嫌侵权",
    },
    {
      category: 6,
      name: "诱导赞同、关注等行为",
    },
  ];

  private get modalShow() {
    return this.show;
  }
  private set modalShow(newVal: boolean) {
    this.$emit("update:show", newVal);
  }

  // 点及举报类型后，输入举报内容
  private toInputReport(e: any) {
    const box = selectEle(e.path, "category");
    if (!box) return;

    const { category } = box.dataset;

    this.category = category;
    this.contentShow = true;
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
