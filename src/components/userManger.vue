<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          :clearable="true"
          v-model="queryInfo.query"
          placeholder="请输入内容"
          @clear="getEmplyeListData"
        >
          <template #append>
            <el-button
              @click="search"
              :icon="Search"
              type="primary"
            ></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="enterdialog1">添加员工</el-button>
      </el-col>
    </el-row>
    <el-table :data="EmplyeList">
      <el-table-column
        align="center"
        label="序号"
        width="80"
        type="index"
      ></el-table-column>
      <el-table-column align="center" label="id" prop="_id"></el-table-column>
      <el-table-column
        align="center"
        label="电话"
        prop="mobile"
      ></el-table-column>
      <el-table-column
        align="center"
        label="密码"
        prop="password"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scoped">
          <el-button
            type="warning"
            size="mini"
            @click="showupdateEmplyeMsgdialog(scoped.row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="delEmplye(scoped.row)"
            >删除</el-button
          >
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

    <!-- 对话框 -->
    <el-dialog title="添加员工信息" v-model="addUserDialogVisible" width="40%">
      <el-form ref="addFormRef" :rules="addFormRules" :model="addForm">
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addUserDialogVisible = false"
            >取消</el-button
          >
          <el-button type="success" @click="addEmplye">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 对话框2 -->

    <el-dialog v-model="updateUserDialogVisible" title="修改信息" width="40%">
      <el-form ref="updateFormRef" :model="updateForm">
        <el-form-item label="唯一id" prop="_id">
          <el-input v-model="updateForm._id" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="updateForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateUserDialogVisible = false" type="primary"
            >退出</el-button
          >
          <el-button type="warning" @click="updateEmplyeMsg">修改</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import {
  getUserInfoList,
  addUser,
  getUsersearch,
  deluser,
  updateuser,
} from "@/api/sys";
import { onMounted, ref } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

//员工列表数据

const EmplyeList = ref([]); //员工列表
const getEmplyeListData = () => {
  getUserInfoList(queryInfo.value).then((res) => {
    EmplyeList.value = res.data;
    queryInfo.value.total = res.total;
  });
};
onMounted(() => {
  getEmplyeListData();
});

//员工列表数据

//添加员工
const addUserDialogVisible = ref(false);
const enterdialog1 = () => {
  addUserDialogVisible.value = true;
};
const addFormRef = ref(null);
const addEmplye = () => {
  addFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage({
        message: "提交信息不符合要求",
        type: "warning",
      });
    } else {
      addUser(addForm.value).then((res) => {
        if (res.info == "success") {
          ElMessage.success("创建员工成功");
          getEmplyeListData();
          addUserDialogVisible.value = false;
          addForm.value = {
            password: "",
            mobile: "",
          };
        }
      });
    }
  });
};

var addForm = ref({
  password: "",
  mobile: "",
});
var addFormRules = ref({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],

  mobile: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确手机号",
      trigger: "blur",
    },
  ],
});
//添加员工

//分页

const queryInfo = ref({
  query: "",
  pagenum: 1,
  pagesize: 3,
  id: "",
  total: 10,
});
const handleSizeChange = (e) => {
  queryInfo.value.pagesize = e;
  getEmplyeListData();
};
const handleCurrentChange = (e) => {
  queryInfo.value.pagenum = e;
  getEmplyeListData();
};

//分页

//搜索

const search = () => {
  if (!queryInfo.value.query) {
    ElNotification({
      title: "Info",
      message: "如果您要搜索,请在搜索框输入内容。",
      type: "info",
      duration: 3000,
    });
  } else {
    getUsersearch(queryInfo.value.query).then((res) => {
      if (res.data.length == 0) {
        EmplyeList.value = res.data;
        ElMessage({
          message: "没有该员工",
          type: "warning",
        });
      } else {
        EmplyeList.value = res.data;
        ElMessage({
          message: "查询成功",
          type: "success",
        });
      }
    });
  }
  // getUsersearch(queryInfo.value.query).then((res) => {
  //     EmplyeList.value = res.data;
  //   });
};

//搜索

// 删除员工
const delEmplye = (row) => {
  ElMessageBox.confirm("你确定要删除此员工吗 ?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      deluser(row._id).then((res) => {
        getEmplyeListData();
        ElMessage({
          type: "success",
          message: res.data,
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "你取消了删除该员工",
      });
    });
};
// 删除员工

//修改员工信息
const updateFormRef = ref(null);
const updateUserDialogVisible = ref(false);
const updateForm = ref({
  _id: "",
  mobile: "",
  password: "",
});
const showupdateEmplyeMsgdialog = (row) => {
  updateUserDialogVisible.value = true;
  updateForm.value.mobile = row.mobile;
  updateForm.value._id = row._id;
  updateForm.value.password = row.password;
};
const updateEmplyeMsg = () => {
  updateuser(updateForm.value).then((res) => {
    console.log("res", res);
    getEmplyeListData();
    updateUserDialogVisible.value = false;
  });
};

//修改员工信息
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 15px;

  box-shadow: 0 1px 1px #353333;
}

.el-breadcrumb {
  font-size: 12px;
}
</style>
