<template>
  <div class="consumn">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card :body-style="{ padding: 0 }">
          <consumn-left></consumn-left>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: 0 }">
          <consumn-right></consumn-right>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import consumnLeft from "./consumnLeft.vue";
import consumnRight from "./consumnRight.vue";
</script>

<style lang="scss" scoped>
.consumn {
  margin-top: 20px;
}
</style>
