<template>
  <div>
    <el-icon v-if="isFullscreen" @click="onToggle">
      <i class="iconfont icon-quxiaoquanping_o"></i>
    </el-icon>

    <el-icon v-if="!isFullscreen" @click="onToggle">
      <i class="iconfont icon-quanping"></i>
    </el-icon>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import screenfull from "screenfull";

import { FullScreen, CopyDocument } from "@element-plus/icons-vue";

// 是否全屏
const isFullscreen = ref(false);

// 监听变化
const change = () => {
  isFullscreen.value = !isFullscreen.value;
};

// 切换事件
const onToggle = () => {
  screenfull.toggle();
};

// 设置侦听器
onMounted(() => {
  screenfull.on("change", change);
});
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
  cursor: pointer;
}
</style>
