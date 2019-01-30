const express= require("express")
const pool= ("../../pool")
var router = express.Router()
module.exports = router;

/**
 * get /admin/settings
 */
router.get('/',(req,res)=>{
  pool.query("SELECT * FROM xfn_settings LIMIT 1",(err,result)=>{
    if(err) throw err;
    res.send(result[0])
  })
})

/**
 * put /admin/settings
 */
router.put('/',(req,res)=>{
  pool.query('UPDATE xfn_settings SET ?',(err,result)=>{
    if(err) throw err
    res.send({code:200,msg:"settings updated succ"})
  })
})