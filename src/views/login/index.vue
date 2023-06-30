<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon><Key /></el-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="changePasswordType">
          <el-icon>
            <View v-if="passwordType == 'text'" />
            <Hide v-if="passwordType == 'password'" />
          </el-icon>
        </span>
      </el-form-item>
      <el-button
        @click="handleLogin"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { Avatar, View, Hide, Key } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const loginForm = ref({
  username: "18612345678",
  password: "123456",
});
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "用户名必须填写",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: "密码必须填写",
    },
    {
      min: 5,
      max: 20,
      message: "password need 5-20 length !",
    },
  ],
});

// 显示隐藏密码
const passwordType = ref("password");
const changePasswordType = () => {
  if (passwordType.value == "password") {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
};

// 登录
const loading = ref(false);
// 初始化时是null，当执行挂载(mounted)
//就会引用el-form(里面含有ref)把null覆盖
const loginFormRef = ref(null);
const store = useStore();
const router = useRouter();
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    //符合loginRules,valid就是true，反之false
    console.log("valid", valid);
    if (!valid) return;
    loading.value = true;
    store
      .dispatch("user/userLogin", loginForm.value)
      .then((res) => {
        console.log("login页面得到的结果");
        console.log(res);
        if (res.code == "1000") {
          loading.value = false;
          router.push("/");
        }
      })
      .catch(() => {
        loading.value = false;
      });
  });
};

//登录
</script>

<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  background-color: transparent;
  box-shadow: 0 0 0 0px;
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
