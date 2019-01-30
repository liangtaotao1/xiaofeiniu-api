const express= require("express")
var router = express.Router()
module.exports = router;

/**
 * get /admin/table
 */
router.get('/',(req,res)=>{
  pool.query("SELECT * FROM xfn_table ORDER BY tid",(err,result)=>{
    if(err) throw err;
    res.send(result[0])
  })
})
