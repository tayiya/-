<template>
  <div class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <!-- 左侧数据模块 -->
        <trendleft :data="chartTrendData"></trendleft>
      </el-col>
      <el-col :span="18">
        <trendright :data="chartTrendData"></trendright>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import trendleft from "./trendleft.vue";
import trendright from "./trendright.vue";
import { ref } from "vue";
const chartTrendData = ref({
  allAmount: "264264",
  tadayAdded: "5568",
  tadaySub: "58955",
  tadayAmount: "68444",
  monthAmountList: [
    {
      time: "2012",
      amount: 6988,
    },
    {
      time: "2013",
      amount: 7988,
    },
    {
      time: "2014",
      amount: 8988,
    },
    {
      time: "2015",
      amount: 9988,
    },
    {
      time: "2016",
      amount: 7988,
    },
    {
      time: "2017",
      amount: 4988,
    },
    {
      time: "2018",
      amount: 5988,
    },
  ],
});
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
  // background-color: #bcbfc3;
}
</style>
