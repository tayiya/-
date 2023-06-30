<template>
  <div class="aside">
    <div class="logo-container">
      <el-avatar
        shape="square"
        :size="40"
        :src="$store.state.user.userinfo.data.avatar"
      >
      </el-avatar>
      <h3 class="logo-title">XXXX后台管理系统</h3>
    </div>
    <!-- 菜单栏 -->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#ffd04b"
    >
      <el-sub-menu
        v-for="(item, index) in $store.state.user.userinfo.rights"
        :key="index"
        :index="String(index)"
      >
        <template #title>
          <i :class="iconlist[item.authName]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          v-for="item1 in item.children"
          :key="item1.path"
          :index="item1.path"
          @click="$router.push({ path: item1.path })"
        >
          <template #title>
            <i :class="iconlist[item1.authName]"></i>
            <span>{{ item1.authName }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
const iconlist = ref({
  个人相关: "iconfont icon-gerenzhongxin",
  个人中心: "iconfont icon-icon03",
  销售: "iconfont icon-xiaoshou",
  车辆管理: "iconfont icon-wode2",
  用户: "iconfont icon-zhanghu",
  员工管理: "iconfont icon-yuangongguanli",
  用户管理: "iconfont icon-yonghuguanli",
  互联影库: "iconfont icon-dianying",
  销售排名: "iconfont icon-shangpinxiaoshoupaiming",
  销售信息: "iconfont icon-pinpaixiaoshou",
  工资管理: "iconfont icon-gongziguanli",
  员工工资: "iconfont icon-yuangonggongzi",
  高管工资: "iconfont icon-paiming",
  请假审批: "iconfont icon-qingjiashenhe",
  人事管理: "iconfont icon-renshiguanli",
  请假管理: "iconfont icon-hrattendanceleave",
  审批信息: "iconfont icon-shenhexinxi",
  文章: "iconfont icon-16",
  文章排名: "iconfont icon-shangpinxiaoshoupaiming",
  创建文章: "iconfont icon-chuangjian",
  请假申请: "iconfont icon-qingjiashenqing",
  电影管理: "iconfont icon-dianyingpiao",
  员工任务: "iconfont icon-yuangongrenwu",
  任务: "iconfont icon-renwu",

  角色管理: "iconfont icon-dingdanguanli",
  权限列表: "iconfont icon-shujutongji",
  秘书管理: "iconfont icon-jianshen-nvxing-meinv",
  前台管理: "iconfont icon-qiantai",
  用户信息: "iconfont icon-yuedu",
  车辆信息: "iconfont icon-yuedu",
});
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
}
.logo-container {
  text-align: center;
  padding: 20px 0;
  line-height: 30px;
}
</style>
