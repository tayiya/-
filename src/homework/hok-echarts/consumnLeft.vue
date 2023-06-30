<template>
  <div>
    <div class="yonghu">
      <i class="iconfont icon-zhexiantu"></i>
      <span>用户</span>
    </div>
    <div ref="target" class="target"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
const target = ref(null);
let mChart = null;
const data = ref([
  { timeStr: "01-30", num: "10" },
  { timeStr: "01-31", num: "20" },
  { timeStr: "02-01", num: "50" },
  { timeStr: "02-02", num: "66" },
  { timeStr: "02-03", num: "55" },
  { timeStr: "02-04", num: "53" },
  { timeStr: "02-05", num: "40" },
  { timeStr: "02-06", num: "20" },
  { timeStr: "02-07", num: "50" },
  { timeStr: "02-08", num: "10" },
  { timeStr: "02-09", num: "57" },
  { timeStr: "02-10", num: "42" },
  { timeStr: "02-11", num: "39" },
  { timeStr: "02-12", num: "20" },
  { timeStr: "02-13", num: "50" },
  { timeStr: "02-14", num: "50" },
  { timeStr: "02-15", num: "54" },
  { timeStr: "02-16", num: "68" },
  { timeStr: "02-17", num: "58" },
  { timeStr: "02-18", num: "53" },
  { timeStr: "02-19", num: "35" },
  { timeStr: "02-20", num: "40" },
  { timeStr: "02-21", num: "36" },
  { timeStr: "02-22", num: "30" },
  { timeStr: "02-23", num: "20" },
  { timeStr: "02-24", num: "10" },
  { timeStr: "02-25", num: "5" },
  { timeStr: "02-26", num: "30" },
  { timeStr: "02-27", num: "20" },
  { timeStr: "02-28", num: "20" },
  { timeStr: "03-01", num: "40" },
  { timeStr: "03-02", num: "20" },
]);
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  const options = {
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
      data: data.value.map((item) => item.timeStr),
    },
    yAxis: {
      type: "value",
    },
    series: {
      type: "line",
      data: data.value.map((item) => item.num),
      smooth: true,
      color: "blue",
      areaStyle: {
        color: "skyblue",
      },
    },
    grid: {
      top: 40,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross", //shadow阴影,cross线
      },
    },
  };
  mChart.setOption(options);
};
</script>

<style lang="scss" scoped>
.target {
  height: 400px;
  padding: 0 20px;
}
.yonghu {
  border-bottom: 1px solid #a1a3a6;
  padding: 20px;
}
.icon-zhexiantu {
  color: #2a5caa;
  background-color: #afdfe4;
  padding: 5px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
