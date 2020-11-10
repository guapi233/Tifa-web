import axios from "@/utils/axios";

export default class UploadAdapter {
  constructor(private loader: any) {}

  async upload() {
    const data = new FormData();
    data.append("file", await this.loader.file);
    data.append("allowSize", "10"); // 允许图片上传的大小/兆

    return new Promise((resolve, reject) => {
      axios.post("/uploadImg", data).then((data: any) => {
        if (data.uploaded) {
          resolve({
            default: data.url,
          });
        } else {
          reject("上传失败");
        }
      });
    });
  }

  abort() {
    console.log("upload abort");
  }
}
