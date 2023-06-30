<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-button
            style="margin-right: 10px"
            @click="filmDiaLogVisibleFnSwitch"
            type="primary"
          >
            创建电影信息
          </el-button>
          <el-input
            style="width: 300px"
            v-model="queryInfo.query"
            placeholder="请输入内容"
            @clear="getFilmList"
            :clearable="true"
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

        <el-col :span="12">
          <el-select
            placeholder="输入影片类型"
            v-model="searchFilmForm.type"
            @change="findFilmBytype"
          >
            <el-option
              v-for="item in Filmtype"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 模态框1 -->
      <el-dialog
        title="创建电影"
        v-model="filmDialogVisible"
        width="60%"
        @close="filmDialogClose"
      >
        <el-form ref="filmFormRef" :model="AddForm" label-width="80px">
          <!-- 电影海报 -->
          <el-form-item label="电影海报">
            <el-upload
              class="avatar-upload"
              v-model="AddForm.movieposter"
              :before-upload="handleBeforeUpload"
              :http-request="uploadEnter"
            >
              <img
                :src="AddForm.movieposter"
                class="avatar"
                v-if="AddForm.movieposter"
                alt=""
              />
              <span class="addplus" v-if="!AddForm.movieposter">+</span>
            </el-upload>
          </el-form-item>
          <!-- 影片类型 -->
          <el-form-item label="影片类型">
            <el-select v-model="AddForm.type" placeholder="请选择影片类型">
              <el-option
                v-for="item in filmtypes"
                :key="item.code"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 主演名单 -->
          <el-form-item label="主演名单">
            <el-input v-model="AddForm.actornames"></el-input>
          </el-form-item>
          <!-- 电影简介 -->
          <el-form-item label="电影简介">
            <el-input
              type="textarea"
              v-model="AddForm.filmintroduction"
            ></el-input>
          </el-form-item>
          <!-- 影片名字 -->
          <el-form-item label="电影名字">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>
          <!-- 电影类型 -->
          <el-form-item label="电影类型">
            <el-checkbox-group v-model="AddForm.label" :min="1" :max="2">
              <el-checkbox v-for="type in cities" :key="type" :label="type">{{
                type
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 电影评分 -->
          <el-form-item label="电影评分">
            <div class="demo-rate-block">
              <el-rate v-model="AddForm.filmScore" :max="10" allow-half />
            </div>
          </el-form-item>
          <!-- 上映时间 -->
          <el-form-item label="上映时间">
            <div class="block">
              <el-date-picker
                v-model="AddForm.timeStart"
                type="date"
                placeholder="选择上映时间"
                value-format="YYYY-MM-DD"
              />
            </div>
          </el-form-item>
          <!-- 制片方 -->
          <el-form-item label="制片方">
            <el-select
              v-model="AddForm.areaCountry"
              placeholder="请选择国家类型"
            >
              <el-option
                v-for="item in Country"
                :key="item.code"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="filmDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="filmDialogEnter">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 模态框2 -->
      <el-dialog title="修改电影信息" v-model="filmDialogVisible2" width="60%">
        <el-form ref="filmFormRef" :model="updateFilmForm" label-width="80px">
          <!-- 电影海报 -->
          <el-form-item label="电影海报">
            <el-upload
              class="avatar-upload"
              v-model="updateFilmForm.movieposter"
              :before-upload="handleBeforeUpload"
              :http-request="uploadEnter"
            >
              <img
                :src="updateFilmForm.movieposter"
                class="avatar"
                v-if="updateFilmForm.movieposter"
                alt=""
              />
              <span class="addplus" v-if="!updateFilmForm.movieposter">+</span>
            </el-upload>
          </el-form-item>
          <!-- 影片类型 -->
          <el-form-item label="影片类型">
            <el-select
              v-model="updateFilmForm.type"
              placeholder="请选择影片类型"
            >
              <el-option
                v-for="item in filmtypes"
                :key="item.code"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 主演名单 -->
          <el-form-item label="主演名单">
            <el-input v-model="updateFilmForm.actornames"></el-input>
          </el-form-item>
          <!-- 电影简介 -->
          <el-form-item label="电影简介">
            <el-input
              type="textarea"
              v-model="updateFilmForm.filmintroduction"
            ></el-input>
          </el-form-item>
          <!-- 影片名字 -->
          <el-form-item label="影片名字">
            <el-input v-model="updateFilmForm.name"></el-input>
          </el-form-item>
          <!-- 电影类型 -->
          <el-form-item label="电影类型">
            <el-checkbox-group v-model="updateFilmForm.label" :min="1" :max="2">
              <el-checkbox v-for="type in cities" :key="type" :label="type">{{
                type
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 电影评分 -->
          <el-form-item label="电影评分">
            <div class="demo-rate-block">
              <el-rate
                v-model="updateFilmForm.filmScore"
                :max="10"
                allow-half
              />
            </div>
          </el-form-item>
          <!-- 上映时间 -->
          <el-form-item label="上映时间">
            <div class="block">
              <el-date-picker
                v-model="updateFilmForm.timeStart"
                type="date"
                placeholder="选择上映时间"
                value-format="YYYY-MM-DD"
              />
            </div>
          </el-form-item>
          <!-- 制片方 -->
          <el-form-item label="制片方">
            <el-select
              v-model="updateFilmForm.areaCountry"
              placeholder="请选择制片方"
            >
              <el-option
                v-for="item in Country"
                :key="item.code"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="filmDialogVisible2 = false">取消</el-button>
            <el-button type="primary" @click="filmDialogEnter2">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-table :data="FilmList" style="width: 100%">
        <!-- 序号 -->
        <el-table-column
          align="center"
          label="序号"
          width="60"
          type="index"
        ></el-table-column>
        <!-- 电影海报 -->
        <el-table-column align="center" label="电影海报" prop="movieposter">
          <template #default="scoped">
            <img :src="scoped.row.movieposter" alt="" class="img2" />
          </template>
        </el-table-column>
        <!-- 电影名称 -->
        <el-table-column
          align="center"
          label="片名"
          prop="name"
        ></el-table-column>
        <!-- 电影类型 -->
        <el-table-column align="center" label="类型" prop="label">
        </el-table-column>
        <!-- 制片方 -->
        <el-table-column
          align="center"
          label="国家"
          prop="areaCountry"
        ></el-table-column>
        <!-- 电影评分 -->
        <el-table-column
          align="center"
          label="评分"
          prop="filmScore"
        ></el-table-column>
        <!-- 演员 -->
        <el-table-column
          align="center"
          label="演员"
          prop="actornames"
          show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 电影简介 -->
        <el-table-column
          align="center"
          label="电影简介"
          prop="filmintroduction"
          show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 是否热映 -->
        <el-table-column
          align="center"
          label="上映状态"
          prop="type"
        ></el-table-column>
        <el-table-column
          align="center"
          label="上映时间"
          prop="timeStart"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="updateFilmInfo(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delFilminfo(scope.row)"
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
    </el-card>

    <!-- <el-upload
      class="avatar-upload"
      v-model="AddForm.url"
      :before-upload="handleBeforeUpload"
      :http-request="uploadEnter"
    >
      <img :src="AddForm.url" class="avatar" v-if="AddForm.url" alt="" />
      <span class="addplus" v-if="!AddForm.url">+</span>
    </el-upload> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { clientFn } from "../Utils/ali-oss";
import {
  addfilminfo,
  searchfilm,
  delFilm,
  updateFilm,
  searchfilmbyname,
} from "@/api/sys";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { Search } from "@element-plus/icons-vue";

onMounted(() => {
  getFilmList();
});

const AddForm = ref({
  movieposter: "",
  type: "",
  actornames: "",
  filmintroduction: "",
  name: "",
  filmScore: "",
  timeStart: "",
  areaCountry: "",
  label: [],
});
const cities = ref([
  "动作",
  "冒险",
  "喜剧",
  "剧情",
  "科幻",
  "恐怖",
  "爱情",
  "悬疑",
  "历史",
  "战争",
  "动漫",
  "武侠",
  "家庭",
  "记录",
]);
const Country = ref([
  { name: "中国", code: "01" },
  { name: "美国", code: "02" },
  { name: "印度", code: "03" },
  { name: "日本", code: "04" },
  { name: "韩国", code: "05" },
  { name: "德国", code: "06" },
  { name: "俄罗斯", code: "07" },
  { name: "缅甸", code: "08" },
  { name: "英国", code: "09" },
  { name: "法国", code: "10" },
  { name: "意大利", code: "11" },
  { name: "加拿大", code: "12" },
  { name: "西班牙", code: "13" },
  { name: "丹麦", code: "14" },
  { name: "苏联", code: "15" },
  { name: "阿根廷", code: "16" },
  { name: "荷兰", code: "17" },
  { name: "澳大利亚", code: "18" },
  { name: "挪威", code: "19" },
  { name: "巴西", code: "20" },
]);

const Filmtype = ref([
  {
    name: "正在热映",
    code: "001",
  },
  {
    name: "即将上映",
    code: "002",
  },
  {
    name: "影院下线",
    code: "003",
  },
  {
    name: "全部",
    code: "004",
  },
]);

const filmtypes = ref([
  {
    name: "正在热映",
    code: "001",
  },
  {
    name: "即将上映",
    code: "002",
  },
  {
    name: "影院下线",
    code: "003",
  },
]);
const filmDialogVisible = ref(false);

const filmDiaLogVisibleFnSwitch = () => {
  filmDialogVisible.value = true;
};

const filmDialogEnter = () => {
  console.log(AddForm.value);
  addfilminfo(AddForm.value).then((res) => {
    getFilmList();
    if (res.code == 1) {
      filmDialogVisible.value = false;
    }
    ElMessage({
      message: res.data,
      type: res.code == 1 ? "success" : "warning",
    });
  });
};

const filmDialogClose = () => {
  AddForm.value.actornames = "";
  AddForm.value.movieposter = "";
  AddForm.value.filmintroduction = "";
  AddForm.value.type = "";
  AddForm.value.name = "";
  AddForm.value.filmScore = "";
  AddForm.value.timeStart = "";
  AddForm.value.areaCountry = "";
  AddForm.value.label = [];
};

// 获取电影列表
const FilmList = ref([]); //运营需要管理的电影列表数据源

const getFilmList = () => {
  searchfilm(queryInfo.value).then((res) => {
    FilmList.value = res.data;
    console.log(res.data);
    queryInfo.value.total = res.total;
  });
};

//删除电影
const delFilminfo = (row) => {
  delFilm(row._id).then((res) => {
    ElMessage({
      message: "电影删除成功",
      type: "success",
    });
    getFilmList();
  });
};

//修改电影信息
const updateFilmForm = ref({
  _id: "",
  movieposter: "",
  type: "",
  actornames: "",
  filmintroduction: "",
  name: "",
  filmScore: "",
  timeStart: "",
  areaCountry: "",
  label: [],
});
const filmDialogVisible2 = ref(false);
const updateFilmInfo = (row) => {
  updateFilmForm.value._id = row._id;
  updateFilmForm.value.movieposter = row.movieposter;
  updateFilmForm.value.name = row.name;
  updateFilmForm.value.actornames = row.actornames;
  updateFilmForm.value.areaCountry = row.areaCountry;
  updateFilmForm.value.filmintroduction = row.filmintroduction;
  updateFilmForm.value.timeStart = row.timeStart;
  updateFilmForm.value.type = row.type;
  updateFilmForm.value.filmScore = row.filmScore;
  updateFilmForm.value.label = row.label;
  filmDialogVisible2.value = true;
};
const filmDialogEnter2 = () => {
  updateFilm(updateFilmForm.value).then((res) => {
    if (res.info == "success") {
      filmDialogVisible2.value = false;
      ElMessage({
        message: "电影修改成功",
        type: "success",
      });
      getFilmList();
    } else {
      ElMessage({
        message: "电影修改失败",
        type: "message",
      });
    }
  });
};

//按类型搜索影片
const searchFilmForm = ref({
  type: "",
});
const findFilmBytype = () => {
  queryInfo.value.type = searchFilmForm.value.type;
  getFilmList();
};

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
    searchfilmbyname(queryInfo.value.query).then((res) => {
      if (res.data.length == 0) {
        FilmList.value = res.data;
        ElMessage({
          message: "没有该影片",
          type: "warning",
        });
      } else {
        FilmList.value = res.data;
        ElMessage({
          message: "查询成功",
          type: "success",
        });
      }
    });
  }
};

//分页
const queryInfo = ref({
  query: "",
  pagenum: 1,
  pagesize: 3,
  id: "",
  total: 10,
  type: "",
});
const handleSizeChange = (e) => {
  queryInfo.value.pagesize = e;
  getFilmList();
};
const handleCurrentChange = (e) => {
  queryInfo.value.pagenum = e;
  getFilmList();
};

// 阿里云图片上传
const handleBeforeUpload = (file) => {
  //上传之前的校验函数
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
  //校验成功后开始上传 会走这个函数
  var fileName = "abcimg/" + "banner" + `${Date.parse(new Date())}` + ".jpg";
  clientFn()
    .multipartUpload(fileName, file.file, {
      progress: function (percentage, cpt) {
        console.log("打印进度", percentage);
      },
    })
    .then((res) => {
      AddForm.value.movieposter =
        "https://cs2209-tyy.oss-cn-shenzhen.aliyuncs.com/" + fileName;
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
</style>
