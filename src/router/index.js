import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import { USERRIGHTS } from "@/constant/index";
import {
  setsessionItem,
  getsessionItem,
  removesessionItem,
  removeAllsessionItem,
} from "@/Utils/sessionStorage";

// 动态路由
const DynamicmapsRoutes = {
  "/menu/one": {
    path: "menu/one",
    component: () => import("@/components/profile.vue"),
    meta: {
      index1: "首页",
      index2: "个人中心",
    },
  },
  "/menu/two": {
    path: "menu/two",
    component: () => import("@/components/userManger.vue"),
    meta: {
      index1: "用户",
      index2: "用户管理",
    },
  },
  "/menu/three": {
    path: "menu/three",
    component: () => import("@/components/rolemanager.vue"),
    meta: {
      index1: "用户",
      index2: "创造资讯",
    },
  },
  "/menu/four": {
    path: "menu/four",
    component: () => import("@/components/rolelist.vue"),
    meta: {
      index1: "用户",
      index2: "互联影库",
    },
  },
  "/menu/five": {
    path: "menu/five",
    component: () => import("@/components/articlerank.vue"),
    meta: {
      index1: "销售",
      index2: "销售排名",
    },
  },
  "/menu/six": {
    path: "menu/six",
    component: () => import("@/components/createaritcle.vue"),
    meta: {
      index1: "销售",
      index2: "销售信息",
    },
  },
  "/menu/seven": {
    path: "menu/seven",
    component: () => import("@/components/staffsalary.vue"),
    meta: {
      index1: "工资管理",
      index2: "员工工资",
    },
  },
  "/menu/eight": {
    path: "menu/eight",
    component: () => import("@/components/seniorsalary.vue"),
    meta: {
      index1: "员工",
      index2: "高管薪水",
    },
  },
  "/menu/nine": {
    path: "menu/nine",
    component: () => import("@/components/Leavereq.vue"),
    meta: {
      index1: "请假申请",
      index2: "审批信息",
    },
  },
  "/menu/ten": {
    path: "menu/ten",
    component: () => import("@/components/FilmManger.vue"),
    meta: {
      index1: "电影管理",
      index2: "互联影库",
    },
  },
  "/menu/eleven": {
    path: "menu/eleven",
    component: () => import("@/components/secretary.vue"),
    meta: {
      index1: "人事管理",
      index2: "员工管理",
    },
  },
  "/menu/twelve": {
    path: "menu/twelve",
    component: () => import("@/components/leaveManger.vue"),
    meta: {
      index1: "人事管理",
      index2: "请假管理",
    },
  },
  "/menu/thirteen": {
    path: "menu/thirteen",
    component: () => import("@/homework/Homework.vue"),
    meta: {
      index1: "员工任务",
      index2: "任务",
    },
  },
};

const publicRoutes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index"),
    redirect: "/menu/one",
    children: [
      {
        path: "menu/one",
        component: () => import("@/components/profile.vue"),
        meta: {
          index1: "首页",
          index2: "个人中心",
        },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/:pathMatch(.*)/",
    component: () => import("@/layout/error"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

//白名单
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // console.log("路由守卫得到了token", store.getters.token);
    if (JSON.stringify(store.state.user.userInfo == "{}")) {
      //有token但此时用户信息不够渲染页面的情况
      await store.dispatch("user/getUserInfo");
    }

    next();
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});

//动态路由权限算法
export const initDynamanicRouter = () => {
  const routes = router.options.routes; //返回当前路由
  // console.log("返回的当前路由", routes);
  const route = routes.find((item) => item.name == "layout");
  console.log("要插入的路由", route);
  if (getsessionItem(USERRIGHTS)) {
    var rights = getsessionItem(USERRIGHTS);
  } else {
    rights = [];
  }
  console.log("当前用户的rights", rights);

  rights.forEach((item) => {
    item.children.forEach((child) => {
      if (DynamicmapsRoutes[child.path]) {
        route.children.push(DynamicmapsRoutes[child.path]);
      }
      router.addRoute(route);
    });
  });
};
initDynamanicRouter();

export default router;
