var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/docInfo', (req, res) => {
    let statement = `SELECT a.Email_of_Doctor as email,
            a.Name_of_Doctor as name,
           a.Gender_of_Doctor as gender,
            a.Password_of_Doctor as password
            FROM Doctor_Information_Table a`;
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