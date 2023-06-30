<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(value, key, index) in breadcrumbdata"
      :key="index"
      >{{ value }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute(); //vue可以直接$route拿，vue3要通过函数

const breadcrumbdata = ref([]);

const getbreadcrumbdata = () => {
  breadcrumbdata.value = route.meta;
};

watch(
  route,
  () => {
    getbreadcrumbdata();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
