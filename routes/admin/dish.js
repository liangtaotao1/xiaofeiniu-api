/**
 * 菜品相关路由
 */
const express = require("express")
const pool = require("../../pool")
const router = express.Router()
module.exports = router

/**
 * api: GET /admin/dish
 * 含义：客户端获取所有的菜品类别，按菜品类别查找菜品
 * 返回值如：
 * aid:'',dishList:[]
 */
router.get('/',(req,res)=>{
  pool.query('SELECT * FROM xfn_category ORDER BY cid',(err,result)=>{
    if(err) throw err;
    var dishList = result.data
    console.log(dishList)
    for(var c of dishList){
      pool.query('SELECT * FROM xfn_dish WHERE categoryId=?',c.cid,(err,result)=>{
        if(err) throw err;
        //console.log(result)
         console.log(result)
        

      })
    }
      res.send(result)
  })
})
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