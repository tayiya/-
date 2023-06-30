<template>
  <div class="navbar">
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="right-menu">
      <screenful></screenful>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.state.user.userinfo.data.avatar"
          >
          </el-avatar>
        </div>
        <!-- 具名插槽 -->
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import store from "../../store";
import Breadcrumb from "../../components/Breadcrumb.vue";
import screenful from "../../components/screenful.vue";

const logout = () => {
  store.dispatch("user/logout");
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
.breadcrumb-container {
  float: left;
}
</style>
