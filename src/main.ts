import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// global components
import Avatar from "@/components/Avatar.vue";
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
  Icon,
  RadioGroup,
  Radio,
  Upload,
  Switch,
  Avatar as IAvatar,
} from "view-design";

// global style
import "view-design/dist/styles/iview.css";
import "@/config/iviewTheme.less";

Vue.component("Button", Button);
Vue.component("Input", Input);
Vue.component("IInput", Input); // 使用符合规范的标签名 再次注册一遍 Input（原因：Input无法正常使用双标签，会被代码检查干掉）
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Tooltip", Tooltip);
Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Sider", Sider);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("Icon", Icon);
Vue.component("RadioGroup", RadioGroup);
Vue.component("Radio", Radio);
Vue.component("Upload", Upload);
Vue.component("ISwitch", Switch);
Vue.component("IAvatar", IAvatar);
Vue.component("Avatar", Avatar);

Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
