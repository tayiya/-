<template>
  <div class="trend-data-container">
    <!-- 累计盈利 -->
    <div class="title">
      <div class="title-name">累计盈利</div>
      <div class="title-Amount">
        &yen;
        <span ref="titleAmountTarget">{{ data.allAmount }}</span>
      </div>
    </div>
    <!-- 今日新增 -->
    <div class="item">
      <div class="item-name item-name-border-1">今日新增</div>
      <div class="item-amount">
        <span ref="tadayAddedTarget" class="item-amount-number">{{
          data.tadayAdded
        }}</span>
        新增数量
      </div>
    </div>
    <!-- 今日支出 -->
    <div class="item">
      <div class="item-name item-name-border-2">今日结余</div>
      <div class="item-amount">
        <span ref="tadayExpendTarget" class="item-amount-number">{{
          data.tadaySub
        }}</span>
        支出数量
      </div>
    </div>
    <!-- 今日结余 -->
    <div class="item">
      <div class="item-name item-name-border-3">今日结余</div>
      <div class="item-amount">
        <span ref="tadayBalanceTarget" class="item-amount-number">{{
          data.tadayAmount
        }}</span>
        结余数量
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { CountUp } from "countup.js";
var props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const titleAmountTarget = ref(null);
const tadayAddedTarget = ref(null);
const tadayExpendTarget = ref(null);
const tadayBalanceTarget = ref(null);

onMounted(() => {
  const options = {
    //小数点位
    decimalPlaces: 2,
    //持续时间
    duration: 20,
  };
  new CountUp(titleAmountTarget.value, props.data.allAmount, options).start();
  new CountUp(tadayAddedTarget.value, props.data.tadayAdded, options).start();
  new CountUp(
    tadayBalanceTarget.value,
    props.data.tadayAmount,
    options
  ).start();
  new CountUp(
    tadayExpendTarget.value,
    props.data.tadaySub,
    options
  ).start();
});
</script>

<style lang="scss" scoped>
.trend-data-container {
  .title {
    padding: 12px 20px;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: white;
    .title-name {
      font-size: 12px;
      font-weight: bold;
    }
    .title-amount {
      font-size: 24px;
      margin-top: 4px;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    padding: 16px 0;
    color: #666;
    .item-name {
      font-size: 12px;
      padding: 4px 0 4px 8px;
    }
    .item-amount {
      font-size: 12px;
      .item-amount-number {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .item-name-border-1 {
      border-left: 6px solid #409eff;
    }
    .item-name-border-2 {
      border-left: 6px solid #e6a23c;
    }
    .item-name-border-3 {
      border-left: 6px solid #67c23a;
    }
  }
}
</style>
