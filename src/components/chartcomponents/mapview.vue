<template>
  <el-card class="container">
    <div class="title">地图</div>
    <div class="box" ref="target"></div>
  </el-card>
</template>

<script setup>
import "echarts/extension/bmap/bmap.js";
import { onMounted, ref } from "vue";
import echarts from "echarts";

var chartData = ref([
  { name: "北京", value: [116.5, 40] }, //北京经纬度的坐标系
]);

const target = ref(null);

let mChart = ref(null);

onMounted(() => {
  mChart = echarts.init(target.value);

  renderChart(); //渲染函数
});

const renderChart = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    // 百度地图配置 bmap
    bmap: {
      // 中心点 地图
      center: [109.114129, 36.550339],
      //缩放级别
      zoom: 5,
      //  是否可以滑动
      roam: true,
    },
    series: [
      {
        name: "营收",
        type: "scatter", //散点图
        // 使用的表坐标
        coordinateSystem: "bmap",
        // 数据源
        data: chartData.value,
        // 显示的文本大小配置
        symbolSize: function (val) {
          return 20;
        },
        // 数据使用下标为value第二项的值
        encode: {
          value: 2,
        },
        // 鼠标移入时，高亮的标签样式
        emphasis: {
          label: {
            // 鼠标移入时，显示高亮
            show: true,
          },
        },
        // 散点色值
        color: "#15803d",
      },
    ],
  };

  mChart.setOption(option);
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }
  .box {
    height: 462px;
  }
}
</style>
