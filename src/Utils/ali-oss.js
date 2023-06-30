const OSS = require("ali-oss");
//连接阿里云oss
export function clientFn() {
  var client = new OSS({
    endpoint: "oss-cn-shenzhen.aliyuncs.com",
    accessKeyId: "LTAI5tPB7EqRRY5aAwigr5JZ",
    accessKeySecret: "ZkHKr8JDCoq28R62jM2EgEPF4TyvNa",
    bucket: "cs2209-tyy",//硬盘所在的桶，实际上就是文件夹
  });
  //返回连接成功的实例，会有操作方法，操作远程硬盘
  return client;
}

