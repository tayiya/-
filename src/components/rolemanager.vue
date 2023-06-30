<template>
  <el-card class="consumer-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          :clearable="true"
          v-model="queryInfo.query"
          placeholder="请输入内容"
          @clear="getConsumer"
        >
          <template #append>
            <el-button
              type="primary"
              :icon="Search"
              @click="searchcos"
            ></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col span="4">
        <el-button type="success" @click="showAddConsumerDialog"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="ConsumerList">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="名称" prop="name" align="center">
      </el-table-column>
      <el-table-column label="电话" prop="mobile" align="center">
      </el-table-column>
      <el-table-column label="密码" prop="password" align="center">
      </el-table-column>
      <el-table-column label="年龄" prop="age" align="center">
      </el-table-column>
      <el-table-column label="身高" prop="height" align="center">
      </el-table-column>
      <el-table-column label="星座" prop="constellation" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scoped">
          <el-button
            type="primary"
            @click="showUpdateConsumerDialog(scoped.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="delcos(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="queryInfo.pagesize"
      :total="queryInfo.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    <!-- 对话框1 -->
    <el-dialog v-model="AddConsumerDialog" title="添加用户">
      <el-form
        ref="AddConsumerRef"
        :model="consumerForm"
        :rules="consumerFormRules"
      >
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="consumerForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="consumerForm.password"></el-input>
        </el-form-item>
        <el-row :gutter="60">
          <el-col span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="consumerForm.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="身高" prop="height">
              <el-input v-model="consumerForm.height"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="consumerForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <!-- <el-form-item label="星座" prop="constellation">
              <el-input v-model="consumerForm.constellation"></el-input>
            </el-form-item> -->
            <el-select
              placeholder="请选择星座"
              v-model="updateForm.constellation"
              @change="fn1"
            >
              <el-option
                v-for="(item, index) in constellationForm"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="AddConsumerDialog = false" type="primary"
          >取消</el-button
        >
        <el-button type="success" @click="AddConsumer">添加</el-button>
      </template>
    </el-dialog>
    <!-- 对话框2 -->
    <el-dialog v-model="UpdateConsumerDialog">
      <el-form :model="updateForm" ref="updateFormRef">
        <el-form-item prop="_id" label="唯一id">
          <el-input v-model="updateForm._id" readonly></el-input>
        </el-form-item>

        <el-form-item prop="mobile" label="电话">
          <el-input v-model="updateForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="updateForm.password"></el-input>
        </el-form-item>
        <el-row :gutter="60">
          <el-col span="12">
            <el-form-item prop="name" label="名称">
              <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item prop="age" label="年龄">
              <el-input v-model="updateForm.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col span="12">
            <el-form-item prop="height" label="身高">
              <el-input v-model="updateForm.height"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <!-- <el-form-item prop="constellation" label="星座">
              <el-input v-model="updateForm.constellation"></el-input>
            </el-form-item> -->
            <el-form-item prop="constellation" label="星座">
              <el-select
                placeholder="请选择星座"
                v-model="updateForm.constellation"
                @change="fn"
              >
                <el-option
                  v-for="(item, index) in constellationForm"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="UpdateConsumerDialog = false"
          >取消</el-button
        >
        <el-button type="warning" @click="changeConsumer">修改</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import {
  getConsumerList,
  addConsumer,
  searchConsumer,
  delConsumer,
  updateConsumerMsg,
} from "@/api/sys";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

const AddConsumerDialog = ref(false);

const showAddConsumerDialog = () => {
  AddConsumerDialog.value = true;
};
const consumerForm = ref({
  mobile: "",
  password: "",
  age: "",
  height: "",
  name: "",
  constellation: "",
});
const consumerFormRules = ref({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
  ],
  mobile: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确手机号",
      trigger: "blur",
    },
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    { pattern: /^[1-9]\d*$/, message: "年龄必须是正整数", trigger: "blur" },
  ],
  height: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    {
      pattern: /^[1-9]\d*$/,
      message: "身高必须是正整数,单位为cm",
      trigger: "blur",
    },
  ],
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
  constellation: [{ required: true, message: "请输入星座", trigger: "blur" }],
});

const constellationForm = ref([
  "白羊座",
  "金牛座",
  "双子座",
  "巨蟹座",
  "狮子座",
  "处女座",
  "天秤座",
  "天蝎座",
  "射手座",
  "摩羯座",
  "水瓶座",
  "双鱼座",
]);

const ConsumerList = ref([]);

const getConsumer = () => {
  getConsumerList(queryInfo.value).then((res) => {
    ConsumerList.value = res.data;
    queryInfo.value.total = res.total;
  });
};

onMounted(() => {
  getConsumer();
});

//添加用户
const AddConsumerRef = ref(null);
const fn1 = (e) => {
  consumerForm.value.constellation = e;
};
const AddConsumer = () => {
  console.log("添加用户", consumerForm.value);
  AddConsumerRef.value.validate((valid) => {
    if (!valid) {
      ElMessage({
        message: "提交信息不符合要求",
        type: "warning",
      });
    } else {
      addConsumer(consumerForm.value).then((res) => {
        getConsumer();
        consumerForm.value = {
          mobile: "",
          password: "",
          age: "",
          height: "",
          name: "",
          constellation: "",
        };
        AddConsumerDialog.value = false;
        ElMessage({
          message: res.data,
          type: "success",
        });
      });
    }
  });
};
//添加用户

//分页
const queryInfo = ref({
  id: "",
  pagesize: 3,
  total: 10,
  query: "",
  pagenum: 1,
});

const handleSizeChange = (e) => {
  queryInfo.value.pagesize = e;
  getConsumer();
};
const handleCurrentChange = (e) => {
  queryInfo.value.pagenum = e;
  getConsumer();
};

//分页

//搜索用户
const searchcos = () => {
  if (!queryInfo.value.query) {
    ElNotification({
      title: "Info",
      message: "如果您要搜索,请在搜索框输入内容。",
      type: "info",
      duration: 3000,
    });
  } else {
    searchConsumer(queryInfo.value.query).then((res) => {
      if (res.data == "[]") {
        ConsumerList.value = [];
        ElMessage({
          message: res.message,
          type: "warning",
        });
      } else {
        ConsumerList.value = res.data;
        ElMessage({
          message: res.message,
          type: "success",
        });
      }
    });
  }
};

//搜索用户

//删除用户

const delcos = (row) => {
  ElMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      delConsumer(row._id).then((res) => {
        ElMessage({
          type: "success",
          message: res.message,
        });
        getConsumer();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

//删除用户

//修改用户
const UpdateConsumerDialog = ref(false);
const updateForm = ref({
  _id: "",
  name: "",
  password: "",
  age: "",
  height: "",
  mobile: "",
  constellation: "",
});
const fn = (e) => {
  updateForm.value.constellation = e;
};
const showUpdateConsumerDialog = (row) => {
  UpdateConsumerDialog.value = true;
  updateForm.value.mobile = row.mobile;
  updateForm.value._id = row._id;
  updateForm.value.password = row.password;
};
const changeConsumer = () => {
  updateConsumerMsg(updateForm.value).then((res) => {
    console.log(res);
    if (res.info == "success") {
      getConsumer();
      UpdateConsumerDialog.value = false;
      ElMessage({
        message: res.message,
        type: "success",
      });
    }
  });
};
//修改用户
</script>

<style></style>
