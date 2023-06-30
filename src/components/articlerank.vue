<template>
  <div class="top-view">
    <el-row :gutter="20">
      <!-- 1------------------------------------- -->
      <el-col :span="6">
        <el-card :body-style="{ padding: 0 }" shadow="hover">
          <echarts-common-card title="累计销售业绩" value="123,33,34">
            <div class="compare">
              <span class="day">日同比</span>
              <span class="money">50%</span>
            </div>
            <div class="compare">
              <span class="month">月同比</span>
              <span class="money">30%</span>
            </div>
            <template #footer>
              <span>昨日销售数据</span>
              <span class="money">￥30,270,1586</span>
            </template>
          </echarts-common-card>
        </el-card>
      </el-col>
      <!-- 2------------------------------------- -->
      <el-col :span="6">
        <el-card :body-style="{ padding: 0 }" shadow="hover">
          <echarts-common-card title="累计订单数量" value="28,155,235">
            <div
              id="totalorder"
              :style="{ width: '100%', height: '100%' }"
            ></div>
            <template v-slot:footer>
              <span>昨日订单量</span>
              <span class="money">￥51,056,000</span>
            </template>
          </echarts-common-card>
        </el-card>
      </el-col>
      <!-- 3------------------------------------- -->
      <el-col :span="6">
        <el-card :body-style="{ padding: 0 }" shadow="hover">
          <echarts-common-card title="近期用户交费趋势" value="15.223.222">
            <div
              id="RecentPaymentTrend"
              :style="{ width: '100%', height: '100%' }"
            ></div>
            <template #footer>
              <span>今日退货率</span>
              <span class="money">2.8%</span>
            </template>
          </echarts-common-card>
        </el-card>
      </el-col>
      <!-- 4------------------------------------- -->
      <el-col :span="6">
        <el-card :body-style="{ padding: 0 }" shadow="hover">
          <echarts-common-card title="季度销售增长" value="5,333,232">
            <div
              id="QuarterlySalesGrowth"
              :style="{ width: '100%', height: '100%' }"
            ></div>
            <template #footer>
              <span>季度增长曲率</span>
              <span class="money">23.2%</span>
            </template>
          </echarts-common-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
import echartsCommonCard from "./ariiclerankComponent/echartsCommonCard.vue";
onMounted(() => {
  const chartDom = document.getElementById("totalorder");
  const chart = echarts.init(chartDom);
  chart.setOption({
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: "line",
        data: [320, 432.22, 534, 555, 420, 320, 368, 444, 123, 333, 456, 654],
        areaStyle: {
          color: "purple",
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          opacity: 0,
        },
        smooth: true,
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  // --- 3 ----------------------------------------

  const chartDom1 = document.getElementById("RecentPaymentTrend");
  const chart1 = echarts.init(chartDom1);
  chart1.setOption({
    xAxis: {
      show: false,
      type: "category",
    },
    yAxis: {
      show: false,
    },
    series: {
      type: "bar",
      data: [320, 432.22, 534, 555, 420, 320, 368, 444, 123, 333, 456, 654],
      smooth: true,
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  // --- 4 ----------------------------------------

  const chartDom2 = document.getElementById("QuarterlySalesGrowth");
  const chart2 = echarts.init(chartDom2);
  chart2.setOption({
    xAxis: {
      show: false,
      data: ["一季度", "二季度", "三季度", "四季度"],
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: "bar",
        data: [100, 120, 90, 150],
        color: "#2a5caa",
      },
      {
        type: "line",
        data: [100, 120, 90, 150],
        smooth: true,
        color: "yellow",
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
.money {
  color: orange;
  margin-left: 20px;
}
.day {
  color: cyan;
}
.month {
  color: skyblue;
}
</style>
