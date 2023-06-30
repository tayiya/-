<template>
  <div class="leaveManger">
    <el-card>
      <el-table :data="leaveList" style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="100"
        ></el-table-column>
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
          width="200"
        />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              @click="deleteLeaveInfo(scope.row)"
              size="mini"
              v-if="scope.row.leavestatus"
              type="danger"
              >删除</el-button
            >
            <el-button
              @click="approve(scope.row)"
              v-if="scope.row.leavestatus"
              size="mini"
              type="info"
              >点击审批</el-button
            >

            <el-button v-if="!scope.row.leavestatus" size="mini" type="success"
              >审批通过</el-button
            >
            <i v-if="!scope.row.leavestatus" class="el-icon-check"></i>
          </template>
        </el-table-column>
      </el-table>
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
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import { showleaveinfo, delleaveinfo2, updateleaveinfo2 } from "@/api/sys";

const leaveList = ref([]); //员工请假信息
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
//删除请假申请
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

//审批请假
const approve = (row) => {
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
      updateleaveinfo2(row).then((res) => {
        getLeaveList();
        console.log(res);
        ElMessage({
          type: "success",
          message: "审批通过",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

//分页
const queryInfo = ref({
  id: "",
  pagesize: 5,
  total: 10,
  query: "",
  pagenum: 1,
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

<style lang="scss" scoped>
.el-table__cell ::v-deep {
  text-align: center;
}
</style>
