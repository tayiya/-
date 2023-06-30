import request from "@/Utils/request";
//request 新axios 5s过期 自动补全协议

export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/sys/profile",
  });
};

// 休假申请相关API
export const addleaveinfo = (data) => {
  return request({
    url: "/sys/addleaveinfo",
    method: "post",
    data: {
      data: data,
    },
  });
};

//显示请假列表
export const showleaveinfo = (query) => {
  return request({
    url: "/sys/showleaveinfo",
    method: "get",
    params: query,
  });
};

//删除请假信息
export const delleaveinfo2 = (data) => {
  return request({
    url: "/sys/delleaveinfo",
    method: "post",
    data: {
      _id: data,
    },
  });
};

//审核员工请假
export const updateleaveinfo2 = (data) => {
  return request({
    url: "/sys/updateleaveinfo",
    method: "post",
    data: {
      data: data,
    },
  });
};

//获取员工信息
// export const getUserInfoList = () => {
//   return request({
//     url: "/sys/userlist",
//   });
// };
export const getUserInfoList = (query) => {
  return request({
    url: "/sys/userlist",
    method: "get",
    params: query,
  });
};

//添加人员
export const addUser = (data) => {
  return request({
    url: "/sys/adduser",
    method: "post",
    data: data,
  });
};

//搜索
export const getUsersearch = (query) => {
  return request({
    url: "/sys/getUsersearch",
    method: "get",
    params: {
      mobile: query,
    },
  });
};

//删除员工
export const deluser = (data) => {
  return request({
    url: "/sys/deluser",
    method: "post",
    data: {
      data: data,
    },
  });
};

//修改员工信息
export const updateuser = (data) => {
  return request({
    url: "/sys/update",
    method: "post",
    data: {
      data: data,
    },
  });
};

//获取用户信息
export const getConsumerList = (query) => {
  return request({
    url: "/sys/consumerList",
    method: "get",
    params: query,
  });
};

//添加用户
export const addConsumer = (data) => {
  return request({
    url: "/sys/addconsumer",
    method: "post",
    data,
  });
};

//搜索用户
export const searchConsumer = (query) => {
  return request({
    url: "/sys/SearchConsumer",
    method: "get",
    params: {
      mobile: query,
    },
  });
};

//删除用户
export const delConsumer = (data) => {
  return request({
    url: "/sys/delconsumer",
    method: "post",
    data: {
      id: data,
    },
  });
};

//修改用户
export const updateConsumerMsg = (data) => {
  return request({
    url: "/sys/updateconsumer",
    method: "post",
    data,
  });
};

//   添加电影信息接口
export const addfilminfo = (data) => {
  return request({
    url: "sys/addfilminfo",
    method: "post",
    data: {
      data: data,
    },
  });
};

// 查询当前电影信息
export const searchfilm = (data) => {
  return request({
    url: "/sys/findfilminfo",
    method: "get",
    params: data,
  });
};

//根据name找影片
export const searchfilmbyname = (name) => {
  return request({
    url: "/sys/searchfilmname",
    method: "get",
    params: {
      name,
    },
  });
};

//删除电影
export const delFilm = (data) => {
  return request({
    url: "sys/delfilm",
    method: "post",
    data: {
      _id: data,
    },
  });
};

//修改电影信息
export const updateFilm = (data) => {
  return request({
    url: "/sys/updatefilminfo",
    method: "post",
    data,
  });
};

//创建文章
export const createarticle = (data) => {
  return request({
    url: "/sys/addarticle",
    method: "post",
    data,
  });
};

//获取文章
export const getarticlelist = () => {
  return request({
    url: "/sys/getarticle",
    method: "get",
  });
};

//删除文章
export const delwz = (data) => {
  return request({
    url: "/sys/delwz",
    method: "post",
    data: {
      _id: data,
    },
  });
};
