<template>
  <div>
    <div class="yonghu">
      <i class="iconfont icon-xiangshuiping"></i>
      <span>购买用户统计</span>
    </div>
    <div ref="target" class="target"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
let mChart = null;
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const data = ref([
  { name: "未消费用户", value: 92 },
  { name: "消费一次用户", value: 5 },
  { name: "留存用户", value: 2 },
  { name: "回流用户", value: 1 },
]);
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: data.value,
        label: { show: true },
        emphasis: {
          label: {
            show: true,
            fontSize: "22",
            fontWeight: "bold",
          },
        },
        center: ["50%", "60%"],
      },
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    legend: {
      orient: "vertical",
      right: 0,
      padding: [40, 0, 0, 0],
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
  margin-bottom: 10px;
}
.icon-xiangshuiping {
  color: #2a5caa;
  background-color: #afdfe4;
  padding: 5px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
