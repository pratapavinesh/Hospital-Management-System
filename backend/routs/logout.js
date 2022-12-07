var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/endSession', (req, res) => {
    console.log("Ending session");
    email_in_use = "";
    password_in_use = "";
  });
  module.exports=router;