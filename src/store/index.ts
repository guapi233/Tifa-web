import Vue from "vue";
import Vuex from "vuex";
import { getStorage, setStorage } from "@/utils/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: getStorage("userInfo") || {},
    token: getStorage("token"),
    writeTitle: "",
    writeSubTitle: "",
    articleTags: [],
  },
  mutations: {
    setUserInfoAndToken(
      state,
      { userInfo, token }: { userInfo: object; token: string }
    ) {
      setStorage("userInfo", JSON.stringify(userInfo));
      token && setStorage("token", token);

      state.userInfo = userInfo;
      token && (state.token = token);
    },
    setWriteTitle(state, txt: string) {
      state.writeTitle = txt;
    },
    setWriteSubTitle(state, txt: string) {
      state.writeSubTitle = txt;
    },
    setArticleTags(state, tags: any) {
      state.articleTags = tags;
    },
    clearArticleTags(state) {
      state.articleTags = [];
    },
  },
  actions: {},
  modules: {},
});
