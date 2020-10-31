import Vue from "vue";
import Vuex from "vuex";
import { getStorage, setStorage } from "@/utils/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: getStorage("userInfo") || {},
    token: getStorage("token"),
  },
  mutations: {
    setUserInfoAndToken(
      state,
      { userInfo, token }: { userInfo: object; token: string }
    ) {
      setStorage("userInfo", JSON.stringify(userInfo));
      setStorage("token", token);

      state.userInfo = userInfo;
      state.token = token;
    },
  },
  actions: {},
  modules: {},
});
