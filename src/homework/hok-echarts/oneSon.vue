<template>
  <div class="common-card">
    <div class="title">
      <slot name="header"></slot>
    </div>
    <div class="line"></div>
    <div class="value">{{ value }}</div>
    <div class="ratio">
      <slot></slot>
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRef } from "vue";
const props = defineProps({
  value: String,
});
</script>

<style lang="scss" scoped>
.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}
.title,
.value,
.ratio,
.total {
  padding: 0 10px;
  background-color: #fff;
}
.value {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
}
.iconfont {
  margin-right: 10px;
}
.ratio {
  margin-top: 10px;
}
.total {
  padding-bottom: 10px;
}
</style>
