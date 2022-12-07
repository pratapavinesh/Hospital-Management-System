var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.post('/resetPasswordDoctor', (req, res) => {
    let something = req.query;
    let email = something.email;
    let oldPassword = "" + something.oldPassword;
    let newPassword = "" + something.newPassword;
    let statement = `UPDATE Doctor_Information_Table
                     SET Password_of_Doctor = "${newPassword}" 
                     WHERE Email_of_Doctor = "${email}" 
                     AND Password_of_Doctor = "${oldPassword}";`;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
      else {
        return res.json({
          data: results
        })
      };
    });
  });
  
  module.exports=router;