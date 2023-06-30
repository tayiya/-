// 存储本地数据
export const setItem = (key, val) => {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  window.localStorage.setItem(key, val);
};

//获取本地数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

//删除本地数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

//删除本地全部数据
export const removeAllItem = () => {
  window.localStorage.clear();
};
