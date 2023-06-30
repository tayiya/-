import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";

// axios.create可以创建一个新的axios
// service baseURL自动补全协议 timeout服务器不响应，5s后断开
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (err) => {
    console.log("请求拦截没有配置成功");
  }
);

service.interceptors.response.use(
  (res) => {
    const { info } = res.data;
    if (info === "success") {
      return res.data;
    } else {
      if (res.data.code == "403") {
        store.dispatch("user/logout");
      }
      ElMessage.error(info);
    }
  },
  (error) => {
    ElMessage.error("服务器出错");
  }
);

export default service;
