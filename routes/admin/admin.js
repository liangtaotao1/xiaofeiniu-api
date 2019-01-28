/**
 * 管理员相关路由
 */
const pool = require("../../pool");
const express = require("express");
const router = express.Router();
module.exports = router;

/**
 * api:GET /admin/login:aname/:apwd
 * 请求数据：{aname:'xxx',aped:'xxx'}
 * 返回数据：
 * {code:200,msg:"login succ"}
 * {code:400,msg:"aname or apwd err"}
 */
router.get('/login/:aname/:apwd',(req,res)=>{
  var aname = req.params.aname;
  var apwd = req.params.apwd
  console.log(aname)
  console.log(apwd)
  pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
    if(err) throw err;
    console.log(result.length)
    if(result.length>0){
      res.send({code:200,msg:"login succ"})
    }else{
      res.send({code:400,msg:"aname or apwd err"})
    }
  })
})
/**
 * api:PATCH /admin  修改部分数据新用patch
 * 请求数据：{aname:'xxx',oldped:'xxx',newPwd:'xxx'}
 * 根据管理员和密码修改管理员密码
 * 返回数据：
 * {code:200,msg:"modified succ"}
 * {code:400,msg:"aname or apwd err"}
 * {code:401,msg:" apwd not modified"}
 */
router.patch("/",(req,res)=>{
  var data = req.body;
  console.log(data)
  //首先根据aname/oldPwd查询用户是否存在
  //如果查询到了用户，在修改其密码
  pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?) ',[data.aname,data.oldPwd],(err,result)=>{
    if(err) throw err
    console.log(result);//'*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9
    if(result.length == 0){
      res.send({code:400,msg:'password err'})
      return;
    }
    pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
      if(err) throw err
      console.log(result);
      if(result.changedRows>0){
        res.send({code:200,msg:"modify succ"})
      }else{
        res.send({code:401,msg:"pwd not modified"})
      }
    })
  })
})