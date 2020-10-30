import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Input,
  Form,
  FormItem,
  Tooltip,
  Message,
  Layout,
  Header,
  Sider,
  Content,
  Footer,
  Icon
} from "view-design";

import "view-design/dist/styles/iview.css";
import "@/config/iviewTheme.less";

Vue.component("Button", Button);
Vue.component("Input", Input);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Tooltip", Tooltip);
Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Sider", Sider);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("Icon", Icon);

Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
