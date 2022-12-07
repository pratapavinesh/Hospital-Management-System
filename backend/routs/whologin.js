var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/userInSession', (req, res) => {
    return res.json({ email: `${email_in_use}`, who:`${who}`});
  });
  module.exports=router;