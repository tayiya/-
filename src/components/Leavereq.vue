<template>
  <div class="">
    <el-card>
      <el-button @click="LeaveDialogVisiblefnswitch" type="primary"
        >申请休假</el-button
      >
      <el-dialog title="休假申请" v-model="LeaveDialogVisible" width="60%">
        <el-form :model="LeaveForm" lable-width="'80px">
          <el-form-item label="姓名">
            <el-input v-model="LeaveForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              placeholder="请选择部门"
              v-model="LeaveForm.departmentname"
            >
              <!-- label 下拉显示值  value 选中后的赋值 -->
              <el-option
                v-for="item in departments"
                :key="item.code"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请假原因">
            <el-select placeholder="请选择请假原因" v-model="LeaveForm.reason">
              <el-option
                v-for="item in reasons"
                :key="item.code"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因描述">
            <el-input v-model="LeaveForm.Causedescription"></el-input>
          </el-form-item>
          <el-form-item label="请假时间">
            <el-date-picker
              v-model="LeaveForm.timevalue1"
              type="daterange"
              range-separator="/"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="LeaveDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="Leaveenterdialog1"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>

      <el-table :data="leaveList" style="width: 100%">
        <el-table-column label="序号" align="center" width="80" type="index" />
        <el-table-column prop="name" align="center" label="名字" width="100" />
        <el-table-column
          prop="reason"
          align="center"
          label="请假原因"
          width="100"
        />
        <el-table-column
          label="部门"
          align="center"
          prop="departmentname"
          width="80"
        />
        <el-table-column
          label="时间"
          align="center"
          prop="timevalue1"
          width="180"
        />
        <el-table-column
          label="描述"
          align="center"
          prop="Causedescription"
          width="280"
        />
        <el-table-column label="操作" align="center">
          <template #default="props">
            <el-button
              type="danger"
              size="mini"
              v-if="props.row.leavestatus"
              @click="deleteLeaveInfo(props.row)"
            >
              删除
            </el-button>
            <el-button v-if="props.row.leavestatus" type="info" size="mini">
              待审批
            </el-button>
            <el-button v-if="!props.row.leavestatus" type="primary" size="mini">
              审批通过
            </el-button>
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
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "../store";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import { addleaveinfo, showleaveinfo, delleaveinfo2 } from "@/api/sys";

// 显示请假信息
const leaveList = ref([]);
// const getLeaveList = () => {
//   showleaveinfo().then((res) => {
//     console.log("res请假列表", res);
//     if (res.info == "success") {
//       leaveList.value = res.data;
//     }
//   });
// };
const getLeaveList = () => {
  showleaveinfo(queryInfo.value).then((res) => {
    console.log("res请假信息列表", res);
    if (res.info == "success") {
      leaveList.value = res.data;
      queryInfo.value.total = res.total;
    }
  });
};
onMounted(() => {
  getLeaveList();
});

//操作请假信息
const deleteLeaveInfo = (row) => {
  console.log("row", row);
  ElMessageBox.confirm("是否删除请假信息?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delleaveinfo2(row._id).then((res) => {
        if (res.info == "success") {
          getLeaveList();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

//请假
const LeaveDialogVisible = ref(false);

const LeaveDialogVisiblefnswitch = () => {
  LeaveDialogVisible.value = true;
};

const Leaveenterdialog1 = () => {
  let time1 = new Date(LeaveForm.value.timevalue1[0]);
  var datetime1 =
    time1.getFullYear() + "-" + time1.getMonth() + "-" + time1.getDate();
  let time2 = new Date(LeaveForm.value.timevalue1[1]);
  var datetime2 =
    time2.getFullYear() + "-" + time2.getMonth() + "-" + time2.getDate();

  var fullTime = datetime1 + "~" + datetime2;

  LeaveForm.value.timevalue1 = fullTime;
  console.log(LeaveForm.value);
  addleaveinfo(LeaveForm.value).then((res) => {
    console.log("申请请假返回结果");
    console.log(res);
    if (res.info == "success") {
      getLeaveList();
      ElNotification({
        title: "Success",
        message: "成功申请请假",
        type: "success",
      });
      LeaveDialogVisible.value = false;
    } else {
      ElNotification({
        title: "Error",
        message: "中途出现了小差错，嘻嘻",
        type: "error",
      });
    }
  });
};

// 休假填写表单
var LeaveForm = ref({
  name: store.state.user.userinfo.data.name,
  reason: "",
  departmentname: "",
  timevalue1: "",
  Causedescription: "",
  mobile: store.state.user.userinfo.data.mobile,
});

// 部门选择
const departments = ref([
  {
    name: "IT部门",
    code: "001",
  },
  {
    name: "设计部门",
    code: "002",
  },
  {
    name: "产品部门",
    code: "003",
  },
  {
    name: "人事部门",
    code: "004",
  },
]);

//休假理由
const reasons = ref([
  {
    name: "事假",
    code: "001",
  },
  {
    name: "年假",
    code: "002",
  },
  {
    name: "病假",
    code: "003",
  },
  {
    name: "其他",
    code: "004",
  },
]);

//分页
const queryInfo = ref({
  query: "",
  pagenum: 1,
  pagesize: 5,
  id: "",
  total: 10,
});
const handleSizeChange = (e) => {
  queryInfo.value.pagesize = e;
  getLeaveList();
};
const handleCurrentChange = (e) => {
  queryInfo.value.pagenum = e;
  getLeaveList();
};
</script>

<style></style>
