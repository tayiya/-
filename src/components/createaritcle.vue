<template>
  <div>
    <el-card class="aritcle">
      <el-row>
        <el-button type="success" @click="createwz">创建文章</el-button>
      </el-row>
      <!-- table -->
      <el-table :data="WzList" style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          width="60"
          type="index"
        ></el-table-column>
        <el-table-column
          label="列表简介"
          show-overflow-tooltip="true"
          align="center"
          prop="troduction"
        ></el-table-column>
        <el-table-column
          label="内容"
          show-overflow-tooltip="true"
          align="center"
          prop="title"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="danger" @click="delWZ(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 模态框 -->
      <el-dialog v-model="showCreatewzdialog" @open="show">
        <el-form ref="AddWzFormRef" :rules="AddWzFormRules" :model="AddWzForm">
          <!-- 列表简介 -->
          <el-form-item label="列表简介" prop="troduction">
            <el-input type="textarea" v-model="AddWzForm.troduction"></el-input>
          </el-form-item>
          <!-- 列表图片 -->
          <el-form-item label="列表图片" prop="poster">
            <el-upload
              class="avatar-upload"
              v-model="AddWzForm.poster"
              :before-upload="handleBeforeUpload"
              :http-request="uploadEnter"
            >
              <img
                :src="AddWzForm.poster"
                class="avatar"
                v-if="AddWzForm.poster"
                alt=""
              />
              <span class="addplus" v-if="!AddWzForm.poster">+</span>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- 富文本框 -->
        <el-form-item>
          <div class="editor-container">
            <div id="editor-box" ref="editor_box"></div>
            <div class="bottom">
              <el-button type="info" @click="hideCreatewzdialog"
                >取消</el-button
              >
              <el-button type="primary" @click="onSubmitClick">
                创建
              </el-button>
            </div>
          </div>
        </el-form-item>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { clientFn } from "../Utils/ali-oss";
import { createarticle, getarticlelist, delwz } from "@/api/sys";
import E from "wangeditor";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
const showCreatewzdialog = ref(false);
let el;
const createwz = () => {
  showCreatewzdialog.value = true;
};
const hideCreatewzdialog = () => {
  AddWzForm.value.poster = "";
  AddWzForm.value.title = "";
  AddWzForm.value.troduction = "";
  showCreatewzdialog.value = false;
};
const WzList = ref([]);
const getAllarticle = () => {
  getarticlelist().then((res) => {
    WzList.value = res.data;
  });
};
onMounted(() => {
  getAllarticle();
});

//删除
const delWZ = (row) => {
  console.log(row);

  ElMessageBox.confirm("你确定要删除吗", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delwz(row._id).then((res) => {
        getAllarticle();
        ElMessage({
          type: "success",
          message: res.data,
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "你取消了删除",
      });
    });
};

// 阿里云图片上传
const AddWzForm = ref({
  poster: "",
  troduction: "",
  title: "",
});
const AddWzFormRules = ref({
  poster: { required: true, message: "请选择图片", trigger: "blur" },
  troduction: { required: true, message: "请输入简介", trigger: "blur" },
});

const handleBeforeUpload = (file) => {
  const isJPEG = file.name.split(".")[1] === "jpeg";
  const isJPG = file.name.split(".")[1] === "jpg";
  const isPNG = file.name.split(".")[1] === "png";
  const isWEBP = file.name.split(".")[1] === "webp";
  const isGIF = file.name.split(".")[1] === "gif";
  const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
  if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
    alert("上传图片只能是 JPEG/JPG/PNG 格式!");
  }
  if (!isLt500K) {
    alert("单张图片大小不能超过 4mb!");
  }
  return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
};
const uploadEnter = (file) => {
  var fileName = "abcimg/" + "banner" + `${Date.parse(new Date())}` + ".jpg";
  clientFn()
    .multipartUpload(fileName, file.file, {
      progress: function (percentage, cpt) {
        console.log("打印进度", percentage);
      },
    })
    .then((res) => {
      AddWzForm.value.poster =
        "https://cs2209-tyy.oss-cn-shenzhen.aliyuncs.com/" + fileName;
    });
};

//富文本框
let editor;
const show = () => {
  el = document.querySelector("#editor-box");
  initEditor();
};
const initEditor = () => {
  editor = new E(el);
  console.log(2);
  editor.config.zIndex = 1;
  editor.config.showMenuTooltips = true;
  editor.config.menuTooltipPosition = "down";
  editor.create();
};
//提交创建文章
const onSubmitClick = () => {
  console.log(editor.txt.html());
  AddWzForm.value.title = editor.txt.html();
  createarticle(AddWzForm.value).then((res) => {
    showCreatewzdialog.value = false;
    AddWzForm.value.poster = "";
    AddWzForm.value.title = "";
    AddWzForm.value.troduction = "";
    ElMessage({
      message: res.data,
      type: "success",
    });
  });
};
</script>

<style lang="scss" scoped>
.avatar-upload {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  position: relative;
}

.addplus {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 100px;
  transform: translate(-50%, -50%);
}
img {
  width: 200px;
  height: 200px;
}

.img2 {
  width: 100px;
  height: 100px;
}

.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
