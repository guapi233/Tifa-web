import axios from "@/utils/axios";
import Vue from "vue";


export const login = (data: object) => {
  return axios.post("/login/", data).then((res) => {
    if ((res as any).isOk) {
      return res;
    } else {
      Vue.prototype.$Message.error(res.data);
      return false;
    }
  })
};