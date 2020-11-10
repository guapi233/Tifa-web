<template>
  <div class="rich-text-outermost">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

Vue.use(CKEditor);

@Component
export default class RichText extends Vue {
  private editor = ClassicEditor;
  private editorData = "<p>Content of the editor.</p>";
  private editorConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "imageUpload",
      "imageInsert",
      "|",
      "blockQuote",
      "horizontalLine",
      "insertTable",
      "mediaEmbed",
      "|",
      "code",
      "codeBlock",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "alignment",
      "|",
      "undo",
      "redo"
    ],
    ckfinder: {
      uploadUrl: "http://localhost:3000" + "/uploadFile" // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段,
    },
    language: "zh-cn",
    image: {
      toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"]
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
    },
    licenseKey: ""
  };
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
