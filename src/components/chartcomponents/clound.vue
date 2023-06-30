<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import echarts from "echarts";
import "echarts-wordcloud";
import { ref, onMounted } from "vue";

const wordCloudData = ref([
  { name: "互联影库", value: 700 },
  { name: "用户管理", value: 201 },
  { name: "员工管理", value: 301 },
  { name: "bigScreen", value: 401 },
  { name: "资讯系统", value: 101 },
  { name: "文章管理", value: 301 },
  { name: "审批管理", value: 401 },
  { name: "请假管理", value: 501 },
]);

const target = ref(null);

let mChart = null;
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  const options = {
    title: {
      text: "后台管理关键词",
    },
    series: [
      {
        type: "wordCloud",
        sizeRange: [10, 80],
        rotationRange: [0, 0], //子图是否旋转
        gridSize: 0, //云图关键词之间是否有间隔
        layoutAnimation: true,
        textStyle: {
          //给字体设置随机颜色，页面更好看
          normal: {
            color() {
              //颜色随机变化
              let colors = [
                "#fe9a8bb3",
                "#fe9a8bb3",
                "#fe9a8b03",
                "#9E87FFb3",
                "#9E87FFb3",
                "#9E87FFb3",
                "#fe9a8bb3",
                "#fe9a8bb3",
                "#fe9a8bb3",
                "#73DDFF",
                "#58D5FF",
              ];
              return colors[parseInt(Math.random() * 10)];
            },
          },
        },
        data: wordCloudData.value,
      },
    ],
  };
  mChart.setOption(options);
};
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
