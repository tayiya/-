<template>
  <div class="dindan">
    <el-card>
      <div class="ddqh" style="height: 40px; padding: 0 20px">
        <el-row>
          <el-col :span="12">
            <i
              style="color: #426ab3; margin-right: 10px"
              class="iconfont icon-paiming1"
            ></i>
            <span>订单</span>
          </el-col>
          <el-col :span="12">
            <span
              :class="{ blue: index == current }"
              class="nyz"
              v-for="(item, index) in date"
              :key="item.code"
              @click="change(item.code, index, $event)"
              >{{ item.name }}</span
            >
          </el-col>
        </el-row>
      </div>
      <div ref="target" style="height: 300px"></div>
    </el-card>
  </div>
</template>

<script setup>
import echarts from "echarts";
import { ref, onMounted } from "vue";

const date = ref([
  { name: "年", code: 4 },
  { name: "月", code: 3 },
  { name: "周", code: 2 },
  { name: "30天", code: 1 },
]);
let data = ref([
  { timeStr: "01-31", indent: "2", figure: "100" },
  { timeStr: "02-01", indent: "1", figure: "0" },
  { timeStr: "02-02", indent: "5", figure: "1000" },
  { timeStr: "02-03", indent: "2", figure: "0" },
  { timeStr: "02-04", indent: "2", figure: "0" },
  { timeStr: "02-05", indent: "0", figure: "22000" },
  { timeStr: "02-06", indent: "5", figure: "1000" },
  { timeStr: "02-07", indent: "2", figure: "1.1" },
  { timeStr: "02-08", indent: "4", figure: "2.1" },
  { timeStr: "02-09", indent: "4", figure: "2000" },
  { timeStr: "02-10", indent: "3", figure: "4.1" },
  { timeStr: "02-11", indent: "3", figure: "6.1" },
  { timeStr: "02-12", indent: "2", figure: "0" },
  { timeStr: "02-13", indent: "5", figure: "0" },
  { timeStr: "02-14", indent: "1", figure: "15000" },
  { timeStr: "02-15", indent: "2", figure: "0" },
  { timeStr: "02-16", indent: "4", figure: "10000" },
  { timeStr: "02-17", indent: "5", figure: "0" },
  { timeStr: "02-18", indent: "5", figure: "0" },
  { timeStr: "02-19", indent: "2", figure: "24000" },
  { timeStr: "02-20", indent: "4", figure: "0" },
  { timeStr: "02-21", indent: "1", figure: "0" },
  { timeStr: "02-22", indent: "0", figure: "0" },
  { timeStr: "02-23", indent: "0", figure: "0" },
  { timeStr: "02-24", indent: "2", figure: "0" },
  { timeStr: "02-25", indent: "3", figure: "12000" },
  { timeStr: "02-26", indent: "3", figure: "7.1" },
  { timeStr: "02-27", indent: "5", figure: "11000" },
  { timeStr: "02-28", indent: "4", figure: "6700" },
  { timeStr: "03-01", indent: "3", figure: "0" },
  { timeStr: "03-02", indent: "4", figure: "0" },
]);
let codeid = ref(1);
const target = ref(null);
let mChart;
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});

//判断点击了哪里
const current = ref(3);
const change = (code, index, e) => {
  codeid.value = code;
  current.value = index;
  console.log(e.target);
  if (code == 1) {
    data.value = [
      { timeStr: "01-31", indent: "2", figure: "100" },
      { timeStr: "02-01", indent: "1", figure: "0" },
      { timeStr: "02-02", indent: "5", figure: "1000" },
      { timeStr: "02-03", indent: "2", figure: "0" },
      { timeStr: "02-04", indent: "2", figure: "0" },
      { timeStr: "02-05", indent: "0", figure: "22000" },
      { timeStr: "02-06", indent: "5", figure: "1000" },
      { timeStr: "02-07", indent: "2", figure: "1.1" },
      { timeStr: "02-08", indent: "4", figure: "2.1" },
      { timeStr: "02-09", indent: "4", figure: "2000" },
      { timeStr: "02-10", indent: "3", figure: "4.1" },
      { timeStr: "02-11", indent: "3", figure: "6.1" },
      { timeStr: "02-12", indent: "2", figure: "0" },
      { timeStr: "02-13", indent: "5", figure: "0" },
      { timeStr: "02-14", indent: "1", figure: "15000" },
      { timeStr: "02-15", indent: "2", figure: "0" },
      { timeStr: "02-16", indent: "4", figure: "10000" },
      { timeStr: "02-17", indent: "5", figure: "0" },
      { timeStr: "02-18", indent: "5", figure: "0" },
      { timeStr: "02-19", indent: "2", figure: "24000" },
      { timeStr: "02-20", indent: "4", figure: "0" },
      { timeStr: "02-21", indent: "1", figure: "0" },
      { timeStr: "02-22", indent: "0", figure: "0" },
      { timeStr: "02-23", indent: "0", figure: "0" },
      { timeStr: "02-24", indent: "2", figure: "0" },
      { timeStr: "02-25", indent: "3", figure: "12000" },
      { timeStr: "02-26", indent: "3", figure: "7.1" },
      { timeStr: "02-27", indent: "5", figure: "11000" },
      { timeStr: "02-28", indent: "4", figure: "6700" },
      { timeStr: "03-01", indent: "3", figure: "0" },
      { timeStr: "03-02", indent: "4", figure: "0" },
    ];
    series.value = [
      {
        type: "bar",
        name: "订单金额",
        data: data.value.map((item) => item.figure),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#80aaff",
              },
              {
                offset: 1,
                color: "cyan",
              },
            ]),
          },
        },
      },
      {
        type: "line",
        name: "订单数",
        yAxisIndex: 1,
        data: data.value.map((item) => item.indent),
        color: "pink",
      },
    ];
    legend.value = {
      data: ["订单金额", "订单数"],
      right: "center",
    };
    renderChart();
  } else if (code == 4) {
    data.value = [
      {
        timeStr: "一月",
        yesteryearmoney: "90000",
        thisyearmoney: "100000",
        yesteryearnum: "40",
        thisyearnum: "50",
      },
      {
        timeStr: "二月",
        yesteryearmoney: "120000",
        thisyearmoney: "110000",
        yesteryearnum: "68",
        thisyearnum: "55",
      },
      {
        timeStr: "三月",
        yesteryearmoney: "0",
        thisyearmoney: "320000",
        yesteryearnum: "0",
        thisyearnum: "60",
      },
      {
        timeStr: "四月",
        yesteryearmoney: "0",
        thisyearmoney: "400000",
        yesteryearnum: "0",
        thisyearnum: "72",
      },
      {
        timeStr: "五月",
        yesteryearmoney: "0",
        thisyearmoney: "362100",
        yesteryearnum: "0",
        thisyearnum: "66",
      },
      {
        timeStr: "六月",
        yesteryearmoney: "0",
        thisyearmoney: "600000",
        yesteryearnum: "0",
        thisyearnum: "65",
      },
      {
        timeStr: "七月",
        yesteryearmoney: "0",
        thisyearmoney: "1020000",
        yesteryearnum: "0",
        thisyearnum: "70",
      },
      {
        timeStr: "八月",
        yesteryearmoney: "0",
        thisyearmoney: "1100000",
        yesteryearnum: "0",
        thisyearnum: "85",
      },
      {
        timeStr: "九月",
        yesteryearmoney: "0",
        thisyearmoney: "900000",
        yesteryearnum: "0",
        thisyearnum: "90",
      },
      {
        timeStr: "十月",
        yesteryearmoney: "0",
        thisyearmoney: "630000",
        yesteryearnum: "0",
        thisyearnum: "96",
      },
      {
        timeStr: "十一月",
        yesteryearmoney: "0",
        thisyearmoney: "1200000",
        yesteryearnum: "0",
        thisyearnum: "86",
      },
      {
        timeStr: "十二月",
        yesteryearmoney: "0",
        thisyearmoney: "1030000",
        yesteryearnum: "0",
        thisyearnum: "80",
      },
    ];
    series.value = [
      {
        type: "bar",
        name: "去年金额",
        data: data.value.map((item) => item.yesteryearmoney),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#80aaff",
              },
              {
                offset: 1,
                color: "cyan",
              },
            ]),
          },
        },
      },
      {
        type: "bar",
        name: "今年金额",
        data: data.value.map((item) => item.thisyearmoney),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#80aaff",
              },
              {
                offset: 1,
                color: "cyan",
              },
            ]),
          },
        },
      },
      {
        type: "line",
        name: "去年订单数",
        yAxisIndex: 1,
        data: data.value.map((item) => item.yesteryearnum),
        color: "pink",
      },
      {
        type: "line",
        name: "今年订单数",
        yAxisIndex: 1,
        data: data.value.map((item) => item.thisyearnum),
        color: "pink",
      },
    ];
    legend.value = {
      data: ["去年金额", "今年金额", "去年订单数", "今年订单数"],
      right: "center",
    };
    renderChart();
  } else if (code == 2) {
    data.value = [
      { timeStr: "01-31", indent: "2", figure: "822" },
      { timeStr: "02-01", indent: "1", figure: "85" },
      { timeStr: "02-02", indent: "5", figure: "1080" },
      { timeStr: "02-03", indent: "2", figure: "822" },
      { timeStr: "02-04", indent: "2", figure: "0" },
      { timeStr: "02-05", indent: "1", figure: "20000" },
      { timeStr: "02-06", indent: "2", figure: "10000" },
      { timeStr: "02-07", indent: "2", figure: "1.1" },
      { timeStr: "02-08", indent: "5", figure: "2.1" },
      { timeStr: "02-09", indent: "5", figure: "200" },
      { timeStr: "02-10", indent: "6", figure: "40.1" },
      { timeStr: "02-11", indent: "2", figure: "60.1" },
      { timeStr: "02-12", indent: "4", figure: "0" },
      { timeStr: "02-13", indent: "9", figure: "0" },
      { timeStr: "02-14", indent: "7", figure: "15000" },
      { timeStr: "02-15", indent: "6", figure: "0" },
      { timeStr: "02-16", indent: "4", figure: "10500" },
      { timeStr: "02-17", indent: "5", figure: "9000" },
      { timeStr: "02-18", indent: "5", figure: "0" },
      { timeStr: "02-19", indent: "2", figure: "2400" },
      { timeStr: "02-20", indent: "5", figure: "0" },
      { timeStr: "02-21", indent: "5", figure: "700" },
      { timeStr: "02-22", indent: "6", figure: "0" },
      { timeStr: "02-23", indent: "0", figure: "700" },
      { timeStr: "02-24", indent: "2", figure: "0" },
      { timeStr: "02-25", indent: "3", figure: "18000" },
      { timeStr: "02-26", indent: "3", figure: "7.1" },
      { timeStr: "02-27", indent: "8", figure: "15000" },
      { timeStr: "02-28", indent: "8", figure: "6900" },
      { timeStr: "03-01", indent: "9", figure: "0" },
      { timeStr: "03-02", indent: "0", figure: "500" },
    ];
    series.value = [
      {
        type: "bar",
        name: "订单金额",
        data: data.value.map((item) => item.figure),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#80aaff",
              },
              {
                offset: 1,
                color: "cyan",
              },
            ]),
          },
        },
      },
      {
        type: "line",
        name: "订单数",
        yAxisIndex: 1,
        data: data.value.map((item) => item.indent),
        color: "pink",
      },
    ];
    legend.value = {
      data: ["订单金额", "订单数"],
      right: "center",
    };
    renderChart();
  } else if (code == 3) {
    data.value = [
      { timeStr: "01-30", indent: "2", figure: "822" },
      { timeStr: "01-31", indent: "2", figure: "822" },
      { timeStr: "02-01", indent: "1", figure: "855" },
      { timeStr: "02-02", indent: "5", figure: "180" },
      { timeStr: "02-03", indent: "6", figure: "82" },
      { timeStr: "02-04", indent: "2", figure: "0" },
      { timeStr: "02-05", indent: "10", figure: "2000" },
      { timeStr: "02-06", indent: "2", figure: "1000" },
      { timeStr: "02-07", indent: "8", figure: "1.1" },
      { timeStr: "02-08", indent: "4", figure: "2.1" },
      { timeStr: "02-09", indent: "5", figure: "200" },
      { timeStr: "02-10", indent: "6", figure: "400.1" },
      { timeStr: "02-11", indent: "9", figure: "600.1" },
      { timeStr: "02-12", indent: "2", figure: "80" },
      { timeStr: "02-13", indent: "9", figure: "0" },
      { timeStr: "02-14", indent: "7", figure: "1000" },
      { timeStr: "02-15", indent: "7", figure: "0" },
      { timeStr: "02-16", indent: "4", figure: "18500" },
      { timeStr: "02-17", indent: "6", figure: "9000" },
      { timeStr: "02-18", indent: "5", figure: "0" },
      { timeStr: "02-19", indent: "2", figure: "5400" },
      { timeStr: "02-20", indent: "5", figure: "0" },
      { timeStr: "02-21", indent: "5", figure: "7000" },
      { timeStr: "02-22", indent: "6", figure: "0" },
      { timeStr: "02-23", indent: "8", figure: "4700" },
      { timeStr: "02-24", indent: "2", figure: "0" },
      { timeStr: "02-25", indent: "10", figure: "18000" },
      { timeStr: "02-26", indent: "3", figure: "7.1" },
      { timeStr: "02-27", indent: "9", figure: "15000" },
      { timeStr: "02-28", indent: "8", figure: "5900" },
      { timeStr: "03-01", indent: "9", figure: "0" },
      { timeStr: "03-02", indent: "10", figure: "5000" },
    ];
    series.value = [
      {
        type: "bar",
        name: "订单金额",
        data: data.value.map((item) => item.figure),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#80aaff",
              },
              {
                offset: 1,
                color: "cyan",
              },
            ]),
          },
        },
      },
      {
        type: "line",
        name: "订单数",
        yAxisIndex: 1,
        data: data.value.map((item) => item.indent),
        color: "pink",
      },
    ];
    legend.value = {
      data: ["订单金额", "订单数"],
      right: "center",
    };
    renderChart();
  }
};

//提取出来要改的
const series = ref([]);
series.value = [
  {
    type: "bar",
    name: "订单金额",
    data: data.value.map((item) => item.figure),
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: "#80aaff",
          },
          {
            offset: 1,
            color: "cyan",
          },
        ]),
      },
    },
  },
  {
    type: "line",
    name: "订单数",
    yAxisIndex: 1,
    data: data.value.map((item) => item.indent),
    color: "pink",
  },
];
const legend = ref({});
legend.value = {
  data: ["订单金额", "订单数"],
  right: "center",
};

//图规则
const renderChart = () => {
  const options = {
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
      data: data.value.map((item) => item.timeStr),
    },
    yAxis: [
      {
        type: "value",
        name: "金额",
        axisTick: {
          show: false,
        },
      },
      {
        type: "value",
        name: "数量",
        axisTick: {
          show: false,
        },
      },
    ],
    series: series.value,
    legend: legend.value,
    grid: {
      top: 55,
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
  mChart.setOption(options, true);
};
</script>

<style lang="scss" scoped>
.nyz {
  padding: 10px;
  float: right;
  cursor: pointer;
}
.ddqh {
  border-bottom: 1px solid #a1a3a6;
  margin-bottom: 10px;
}
.icon-paiming1 {
  background-color: #afdfe4;
  border-radius: 50%;
  padding: 5px;
}
.blue {
  color: #2175bc;
}
</style>
