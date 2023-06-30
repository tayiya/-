<template>
  <div>
    <!-- 第一行 -->
    <one></one>
    <!-- 第二行 -->
    <div class="two">
      <el-row :gutter="20">
        <el-col v-for="item in iconForm" :key="item.code" :span="3">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <i :class="item.icon" :style="{ color: item.color }"></i>
            <p style="margin-top: 5px">{{ item.title }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 第三行 -->
    <indent v-if="show"></indent>

    <!-- 第四行 -->
    <consumn></consumn>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
import one from "./hok-echarts/one.vue";
import indent from "./hok-echarts/indent.vue";
import consumn from "./hok-echarts/consumn.vue";
import { color } from "echarts/lib/export";

const show = ref(true);

const iconForm = ref([
  {
    color: "#33a3dc",
    icon: "iconfont icon-yonghuguanli",
    title: "用户管理",
    code: 1,
  },
  {
    color: "#7fb80e",
    icon: "iconfont icon-xitongshezhi",
    title: "系统设置",
    code: 7,
  },
  { color: "#f47920", icon: "iconfont icon-gouwuche", title: "商品", code: 8 },
  {
    color: "#444693",
    icon: "iconfont icon-left_menu_order",
    title: "订单管理",
    code: 2,
  },
  {
    color: "#ffc20e",
    icon: "iconfont icon-duanxinpingtai-01",
    title: "短信配置",
    code: 3,
  },
  { color: "#1d953f", icon: "iconfont icon-ka", title: "文章管理", code: 4 },
  {
    color: "#ef5b9c",
    icon: "iconfont icon-fenxiao",
    title: "分销管理",
    code: 5,
  },
  {
    color: "#ffc20e",
    icon: "iconfont icon-youhuiquan",
    title: "优惠券",
    code: 6,
  },
]);
</script>

<style lang="scss" scoped>
.two {
  text-align: center;
  font-size: 12px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
