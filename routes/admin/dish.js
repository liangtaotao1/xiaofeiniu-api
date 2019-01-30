/**
 * 菜品相关路由
 */
const express = require("express")
const pool = require("../../pool")
const router = express.Router()
module.exports = router
const multer = require('multer');
const fs = require("fs")

/**
 * api: GET /admin/dish
 * 含义：客户端获取所有的菜品类别，按菜品类别查找菜品
 * 返回值如：
 * aid:'',dishList:[]
 */
router.get('/',(req,res)=>{
  pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
    if(err) throw err;
    //res.send(result)
    var categoryList = result
    var finishCount = 0//已经查询完菜品的类别的数量
    //循环体内出现异步操作用let                        
    for(let c of categoryList){
      pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
        if(err) throw err;
        c.dishList = result
        //必须保证所有的类别下的菜品都查询完才能发送响应消息---这些查询都是异步的
        finishCount++;
        if(finishCount == categoryList.length){
          res.send(categoryList)
        }
      })
    }
  })
})
/**
 * POST /admin/dish/image
 * 请求参数：
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
 */

var upload = multer({
  dest:"tmp/"  //指定
})
router.post('/image',upload.single('dishImg'),(req,res)=>{
  console.log(req.file);  //客户端上传的图片
  // console.log(req.body); //客户端上传的字符数据
  var tmpFile = req.file.path; //临时文件
  var suffix = req.file.originalname.substring(req.file.originalname.lastIndexOf("."))//原始文件名的后缀部分 
  var newFile = randFileName(suffix)
  fs.rename(tmpFile,'img/dish/'+newFile,()=>{
    res.send({code:200,msg:"upload succ",FileName:newFile})//把临时文件转移
  })
  
})
//生成一个随机文件名
//参数：suffix表示要生成的文件名的后缀
function randFileName(suffix){
  var time = new Date().getTime();//当前系统时间戳
  var num = Math.floor(Math.random()*(10000-1000) + 1000)//4位随机数
  return time + '-' + num + suffix
}
/**
 * POST /admin/dish
 * 添加一个新的菜品
 */
/**
 * api: DELETE /admin/category/:cid
 * 含义：根据菜品的编号的路由参数，删除该菜品
 * 返回值如：
 * {code:200,msg:'1 category deleted'}
 * {code:400,msg:'0 category deleted'}
 */
router.delete("/:cid",(req,res)=>{
  //注意
 
})
/**
 * api: POST /admin/category/ 幂等
 * 请求参数：{cname:'xxx'}
 * 含义：添加新的菜品类别
 * 返回值如：
 * {code:200,msg:"1 category added"，cid:x}
 */
router.post("/",(req,res)=>{
  //console.log(req.body)
  
})
/**
 * api: PUT /admin/category
 * 请求参数：{cid:xx,cname:'xxx'}
 * 含义：根据菜品类别编号修改类别
 * 返回值如：
 * {code:200,msg:"1 category modlfied"}
 * {code:400,msg:"0 category modlfied,notexiste"}
 * {code:401,msg:"0 category modlfied,no modefication"}
 */
 router.put('/',(req,res)=>{
   
 })