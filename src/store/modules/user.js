import { login, getUserInfo } from "@/api/sys";
import { setItem, getItem, removeAllItem } from "@/Utils/storage";
import {
  setsessionItem,
  getsessionItem,
  removesessionItem,
  removeAllsessionItem,
} from "@/Utils/sessionStorage";
import { TOKEN, USERRIGHTS } from "@/constant/index";
import router from "../../router";

export default {
  namespaced: true,
  state: () => ({
    token: getItem("_token") || "",
    userinfo: {},
  }),
  mutations: {
    //变异器 处理同步数据
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userinfo = userInfo;
    },
  },
  actions: {
    //处理异步数据
    userLogin(context, userinfo) {
      console.log("userinfo", userinfo);
      const { username, password } = userinfo;
      return new Promise((resolve, reject) => {
        login({
          mobile: username,
          password: password,
        })
          .then((res) => {
            console.log("res登录结果", res);
            this.commit("user/setToken", res.data._token);
            resolve(res); // 把结果传送回原来的调用地方
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //获取更详细用户信息
    async getUserInfo(context) {
      const res = await getUserInfo();
      // console.log("更详细");
      // console.log(res);
      var userRights = JSON.stringify(res.rights);
      setsessionItem(USERRIGHTS, userRights);
      this.commit("user/setUserInfo", res);
    },
    //退出功能
    logout(context) {
      this.commit("user/setToken", "");
      this.commit("user/setUserInfo", "");
      removeAllItem();
      removeAllsessionItem();
      router.push("/login");
      window.location.reload();
    },
  },
};
