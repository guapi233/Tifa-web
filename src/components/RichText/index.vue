<template>
  <div class="rich-text-outermost">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-model="editorData"
      @ready="onReady"
    ></ckeditor>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import CustomEditor from "./core/ckeditor.js";
import UploadAdapter from "@/utils/uploadAdapter";
import { viewToPlainText } from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";

let that: any = null;

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class RichText extends Vue {
  @Prop({ default: null }) save!: Function | null;
  private editor = CustomEditor;
  private editorData = "";
  private editorConfig = {
    // 自动保存
    autosave: {
      waitingTime: 1500,
      save(editor: any) {
        const contentArea: any = document.querySelector(".ck.ck-content");

        that.save &&
          that.save({
            text: that.editorData,
            plainText: contentArea.textContent,
          });
      },
    },
  };

  private created() {
    // 保存组件引用
    that = this;
  }

  // CKEdit 初始化
  private onReady(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new UploadAdapter(loader);
    };
  }
}
</script>

<style lang="scss">
.rich-text-outermost {
  .ck-editor__editable {
    min-height: 600px;
  }

  .ck-toolbar {
    border: none !important;
  }

  .ck-content {
    border: none !important;
    box-shadow: none !important;
    border-top: 1px solid rgba(153, 153, 153, 0.4) !important;

    margin: 30px auto;
    width: 710px;
    color: #4c4e4d;
    font-size: 16px;

    @import "@/config/articleTheme.scss";
  }
}
</style>
