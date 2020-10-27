import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button } from "view-design";

import "view-design/dist/styles/iview.css";
import "@/config/theme.less";

Vue.component("Button", Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
