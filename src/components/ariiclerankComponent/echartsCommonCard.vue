<template>
  <div class="">
    <div class="title" @click="fn(123)">{{ title }}</div>
    <div class="value">￥{{ value }}</div>
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line"></div>
    <div class="total">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup> 
import { ref, defineProps, defineEmits } from "vue";
defineProps({
  title: String,
  value: String,
});
const emits = defineEmits(["rocket"]); //自定义事件必须先声明
const fn = (e) => {
  emits("rocket", e);
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #999;
}
.value {
  font-size: 25px;
  color: #000;
  margin-top: 5px;
  letter-spacing: 1px;
}
.chart {
  height: 50px;
  //   background-color: red;
}
.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}
.total {
  font-size: 12px;
  color: #666;
}
</style>
