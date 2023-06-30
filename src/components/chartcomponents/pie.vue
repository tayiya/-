<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import echarts from "echarts";
let mchart = null;
let target = ref(null);
onMounted(() => {
  mchart = echarts.init(target.value);
  renderChart();
});
const chartData = ref([
  { value: 1048, name: "华北" },
  { value: 2048, name: "华东" },
  { value: 3048, name: "华西" },
  { value: 3048, name: "华南" },
  { value: 2018, name: "其他" },
]);
const renderChart = () => {
  const options = {
    title: {
      text: "区域销售",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        // 高亮状态展示图表
        emphasis: {
          label: {
            show: true,
            fontSize: "22",
            fontWeight: "bold",
          },
        },
        data: chartData.value,
      },
    ],
  };
  mchart.setOption(options);
};
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
