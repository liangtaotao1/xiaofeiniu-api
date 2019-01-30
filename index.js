/**
 * 小肥牛扫码点餐系统项目API子系统
 */
console.log('追被启动web服务器。。。')
console.log(new Date().toLocaleString())

const PORT = 8090;
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const bodyParser = require("body-parser");
const categoryRouter = require("./routes/admin/category")
const adminRouter = require('./routes/admin/admin')
const dishRouter = require('./routes/admin/dish')
const settingsRouter = require('./routes/admin/settings')


var app = express();
app.listen(PORT,()=>{
  console.log("Server Listenint "+PORT+'...')
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
  "credentials":true,
  "origin":"http://127.0.0.1:5500"
}))

app.use("/admin/category",categoryRouter)
app.use("/admin",adminRouter)
app.use("/admin/dish",dishRouter)
app.use("/asmin/settings",settingsRouter)



