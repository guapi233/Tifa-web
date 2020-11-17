import Vue from "vue";
import Vuex from "vuex";
import { getStorage, setStorage } from "@/utils/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息对象 & 令牌
    userInfo: getStorage("userInfo") || {},
    token: getStorage("token"),
    // 编辑页标题 & 副标题
    writeTitle: "",
    writeSubTitle: "",
    // 文章编辑信息 & 草稿Id & 当前草稿是否用于编辑
    articleObj: {
      title: "",
      banner: "",
      content: "",
      tags: [],
    },
    draftId: "",
    isEdit: false,
  },
  mutations: {
    // 设置用户信息与token
    setUserInfoAndToken(
      state,
      { userInfo, token }: { userInfo: object; token: string }
    ) {
      setStorage("userInfo", JSON.stringify(userInfo));
      token && setStorage("token", token);

      state.userInfo = userInfo;
      token && (state.token = token);
    },

    // 设置编辑页标题
    setWriteTitle(state, txt: string) {
      state.writeTitle = txt;
    },

    // 设置编辑页副标题
    setWriteSubTitle(state, txt: string) {
      state.writeSubTitle = txt;
    },

    // 设置文章编辑信息
    setArticleObj(state, { key, value }) {
      (state.articleObj as any)[key] = value;
    },

    // 清空文章编辑信息
    clearArticleInfo(state) {
      (state.articleObj as any) = {};
      state.draftId = "";
    },

    // 设置当前所在的草稿Id
    setDraftId(state, id: string) {
      state.draftId = id;
    },

    // 设置编辑标志符
    setEdit(state, isEdit: boolean) {
      state.isEdit = isEdit;
    },
  },
  actions: {},
  modules: {},
});
