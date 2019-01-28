/**
 * 菜品类别相关类别
 */
const express = require("express");
const pool = require("../../pool");
var router = express.Router();
module.exports = router;


/**
 * api: GET /admin/category
 * 含义：客户端获取所有的菜品类别，按菜品内别的编号排列
 * 返回值如：
 * //{cid:1,cname:''},{....}
 */
router.get('/',(req,res)=>{
  pool.query('SELECT * FROM xfn_category ORDER BY cid',(err,result)=>{
    if(err) throw err
    //console.log(result);
    res.send(result);

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
  pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?',req.params.cid,(err,result)=>{
    if(err) throw err;
    //指定类别的菜品已经修改完毕
    pool.query('DELETE FROM xfn_category WHERE cid=?',req.params.cid,(err,result)=>{
      if(err) throw err
      if(result.affectedRows>0){
        res.send({code:200,msg:"1 category deleted"})
      }else{
        res.send({code:400,msg:"0 category deleted"})
      }
    })
  })
  
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
  var data = req.body;
  pool.query('INSERT INTO xfn_category SET ?',data,(err,result)=>{
    if(err) throw err
    //console.log(result)
    
    res.send({code:200,msg:"1 category insert"})
    
    
  })
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
   var data = req.body; //请求数据{cid:'',cname:""}
   console.log(data)
   //todo 此处可以对数据进行验证
   pool.query('UPDATE xfn_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
     if(err) throw err;
     if(result.changedRows>0){//实际更新了一行
       res.send({code:200,msg:"1 category modified"})
     }else if(result.affectedRows == 0){
       res.send({code:400,msg:" category not exits" })
     }else if(result.affectedRows==1 && result.changedRows==0){//影响到1行，但修改l0行
      res.send({code:401,msg:"no category modified"})
     }
     
   })
 })