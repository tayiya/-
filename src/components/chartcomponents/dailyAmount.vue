<template>
  <el-card :body-style="{ paddingTop: '12px' }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
const data = ref([
  { timeStr: "2022-02-12", income: "55.5", expense: "6.1" },
  { timeStr: "2022-02-13", income: "46.5", expense: "3.1" },
  { timeStr: "2022-02-14", income: "37.5", expense: "5.1" },
  { timeStr: "2022-02-15", income: "51.5", expense: "9.1" },
  { timeStr: "2022-02-16", income: "32.5", expense: "1.1" },
  { timeStr: "2022-02-17", income: "49.5", expense: "7.1" },
  { timeStr: "2022-02-18", income: "52.5", expense: "1.1" },
  { timeStr: "2022-02-19", income: "63.5", expense: "2.1" },
  { timeStr: "2022-02-20", income: "31.5", expense: "1.1" },
  { timeStr: "2022-02-21", income: "63.5", expense: "4.1" },
  { timeStr: "2022-02-22", income: "66.5", expense: "6.1" },
  { timeStr: "2022-02-23", income: "74.5", expense: "7.1" },
  { timeStr: "2022-02-24", income: "41.5", expense: "3.1" },
  { timeStr: "2022-02-25", income: "32.5", expense: "2.1" },
  { timeStr: "2022-02-26", income: "33.5", expense: "7.1" },
  { timeStr: "2022-02-27", income: "21.5", expense: "4.1" },
  { timeStr: "2022-02-28", income: "12.5", expense: "2.1" },
  { timeStr: "2022-02-29", income: "62.5", expense: "9.1" },
  { timeStr: "2022-02-30", income: "41.5", expense: "3.1" },
]);

const target = ref(null);
let mChart;
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  const options = {
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
      data: data.value.map((item) => item.timeStr),
    },
    series: [
      {
        type: "bar",
        name: "收益",
        stack: "Total",
        label: {
          show: true,
        },
        data: data.value.map((item) => item.income),
        color: "cyan",
      },
      {
        type: "bar",
        name: "支出",
        stack: "Total", //两张图stack一样会发生堆叠
        data: data.value.map((item) => item.expense),
        label: {
          show: true,
          position: "right",
        },
        color: "pink",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross", //shadow阴影,cross线
      },
    },
    legend: {
      data: ["收益", "支出"],
      right: "0",
    },
    emphasis: {
      focus: "series",
    },
    grid: {
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: true,
    },
  };
  mChart.setOption(options);
};
</script>

<style lang="scss" scoped>
.container {
  height: 410px;
  // background-color: #bcbfc3;
}
</style>
