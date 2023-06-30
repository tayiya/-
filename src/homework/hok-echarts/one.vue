<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card shadow="hover" :body-style="{ padding: 0 }">
        <oneSon :value="7.62" :icon="['icon-yonghuguanli', 'icon-shenhexinxi']">
          <div class="compare">
            <span class="day">日环比</span>
            <span class="ratio">-100%</span>
            <span class="day">周环比</span>
            <span class="ratio">-3.54%</span>
          </div>
          <template #header>
            <span class="head-left">销售额</span>
            <span class="head-right">昨日</span>
          </template>
          <template #footer>
            <span class="monthe">本月销售额</span>
            <span class="money">0元</span>
          </template>
        </oneSon>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" :body-style="{ padding: 0 }">
        <oneSon :value="471">
          <div class="compare">
            <span class="day">日环比</span>
            <span class="ratio">-94.9%</span>
            <span class="day">周环比</span>
            <span class="ratio">-63.69%</span>
          </div>
          <template #header>
            <span class="head-left">用户访问量</span>
            <span class="head-right">昨日</span>
          </template>
          <template #footer>
            <span class="monthe">本月访问量</span>
            <span class="money">24Pv</span>
          </template>
        </oneSon>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" :body-style="{ padding: 0 }">
        <oneSon :value="5">
          <div class="compare">
            <span class="day">日环比</span>
            <span class="ratio">-100%</span>
            <span class="day">周环比</span>
            <span class="ratio">-41.66%</span>
          </div>
          <template #header>
            <span class="head-left">订单量</span>
            <span class="head-right">昨日</span>
          </template>
          <template #footer>
            <span class="monthe">本月订单量</span>
            <span class="money">0单</span>
          </template>
        </oneSon>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" :body-style="{ padding: 0 }">
        <oneSon :value="44">
          <div class="compare">
            <span class="day">日环比</span>
            <span class="ratio">-94.18%</span>
            <span class="day">周环比</span>
            <span class="ratio">-63.69%</span>
          </div>
          <template #header>
            <span class="head-left">新增用户</span>
            <span class="head-right">昨日</span>
          </template>
          <template #footer>
            <span class="monthe">本月新增用户</span>
            <span class="money">3人</span>
          </template>
        </oneSon>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import oneSon from "./oneSon.vue";
</script>

<style lang="scss" scoped>
.head-left {
  font-size: 14px;
  display: inline-block;
  margin-top: 10px;
}
.head-right {
  display: inline-block;
  font-size: 12px;
  width: 35px;
  height: 18px;
  text-align: center;
  margin-top: 10px;
  line-height: 18px;
  border-radius: 4px;
  border: 1px solid greenyellow;
  color: greenyellow;
  float: right;
}
.compare {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
.day {
  margin-right: 4px;
}
.ratio {
  margin-right: 10px;
}
.monthe {
  font-size: 12px;
}
.money {
  font-size: 12px;
  float: right;
}
</style>
