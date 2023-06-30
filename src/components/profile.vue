<template>
  <div class="chart-container">
    <!-- 累计收益趋势图 -->
    <trend></trend>
    <!-- 第二行 -->
    <el-row class="mt-20" :gutter="10">
      <el-col :span="16">
        <!-- 日金额分析 -->
        <dailyAmount></dailyAmount>
      </el-col>
      <el-col :span="8">
        <!-- 日历图 -->
        <calendar></calendar>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row class="mt-20" :gutter="10">
      <el-col :span="6">
        <!-- 左侧内容 -->
        <div class="chart-map-left">
          <!-- 饼图 -->
          <pie></pie>
          <!-- 文档云图 -->
          <clound class="mt-20"></clound>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 地图可视化 -->
        <mapview></mapview>
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <tablesheet class="mt-20"></tablesheet>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { initDynamanicRouter } from "@/router";
import trend from "../components/chartcomponents/trend.vue";
import dailyAmount from "./chartcomponents/dailyAmount.vue";
import calendar from "./chartcomponents/calendar.vue";
import pie from "./chartcomponents/pie.vue";
import clound from "./chartcomponents/clound.vue";
import mapview from "./chartcomponents/mapview.vue";
import tablesheet from "./chartcomponents/tablesheet.vue"
onMounted(() => {
  initDynamanicRouter();
});
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
