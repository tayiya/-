<template>
  <div
    class="trend-chart-container"
    :style="{ width: '100%', height: '100%' }"
    ref="target"
  ></div>
</template>

<script setup>
import echarts from "echarts";
import { ref, onMounted, defineProps } from "vue";
let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const target = ref(null);
let mChart;
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  const options = {
    legend: {
      data: ["月累计收益", "日收益曲线"],
      right: "0",
    },
    xAxis: {
      data: props.data.monthAmountList.map((item) => item.time),
      axisTick:{//x轴小刻度值
        show:false //小刻度关闭
      }
    },
    yAxis: {},
    series: [
      {
        name: "月累计收益",
        type: "bar",
        barWidth:'20',
        data: props.data.monthAmountList.map((item) => item.amount),
      },
      {
        name: "日收益曲线",
        smooth:true,
        type: "line",
        data: props.data.monthAmountList.map((item) => item.amount),
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      top: 20,
      right: 0,
      left: 0,
      bottom: 0,
      containLabel: true, // 计算边距时，包含标签 考虑到标签的完整显示 如果不这样就会以主图为主
    },
  };
  mChart.setOption(options);
};
</script>

<style lang="scss" scoped></style>
