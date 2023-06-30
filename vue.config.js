module.exports = {
  //vue脚手架内部自带node服务器 同源策略针对于浏览器和服务器之间
  // devServer vue带的node服务器帮助请求的话 此时node -> node 没有同源策略
  devServer: {
    //配置代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
};
