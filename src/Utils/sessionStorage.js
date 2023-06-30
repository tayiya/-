// 存储本地数据
export const setsessionItem = (key, val) => {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  window.sessionStorage.setItem(key, val);
};

//获取本地数据
export const getsessionItem = (key) => {
  const data = window.sessionStorage.getItem(key);
  console.log('data',JSON.parse(data));
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

//删除本地数据
export const removesessionItem = (key) => {
  window.sessionStorage.removeItem(key);
};

//删除本地全部数据
export const removeAllsessionItem = () => {
  window.sessionStorage.clear();
};
