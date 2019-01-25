/**
 * 小肥牛扫码点餐系统项目API子系统
 */
const PORT = 8090;
const express = require("express");
var app = express();
app.listen(PORT,()=>{
  console.log("Server Listenint "+PORT+'...')
})