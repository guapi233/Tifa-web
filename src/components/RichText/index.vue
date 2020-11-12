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
import { Component, Vue } from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import CustomEditor from "./core/ckeditor.js";
import UploadAdapter from "@/utils/uploadAdapter";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class RichText extends Vue {
  private editor = CustomEditor;
  private editorData = "<p>啊啊啊</p>";
  private editorConfig = {
    autosave: {
      waitingTime: 1500,
      save(editor: any) {
        console.log("??");
      },
    },
  };

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
