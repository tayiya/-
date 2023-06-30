import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/index.scss";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";
createApp(App)
  .use(store)
  .use(ElementPlus, { locale })
  .use(router)
  .use(ElementPlus)
  .mount("#app");
