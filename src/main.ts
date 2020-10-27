import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Input, Form, FormItem } from "view-design";

import "view-design/dist/styles/iview.css";
import "@/config/iviewTheme.less";

Vue.component("Button", Button);
Vue.component("Input", Input);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
