var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/checklogin', (req, res) => {
    let params = req.query;
    let email = params.email;
    let password = params.password;
    console.log(params)
    let sql_statement = `SELECT a.Email_of_Patient as email,
                       a.Name_of_Patient as name,
                       a.Password_of_Patient as password,
                       a.Gender_of_Patient as gender,
                        a.Address_of_Patient as address
                        FROM Patient_Information_Table a
                         WHERE a.Email_of_Patient="${email}" 
                         AND a.Password_of_Patient="${password}"`;
    console.log(sql_statement);
    con.query(sql_statement, function (error, results, fields) {
      if (error) {
        console.log("error");
        return res.status(500).json({ failed: 'error ocurred' })
      }
      else {
        if (results.length === 0) {
        } else {
          var string = JSON.stringify(results);
          var json = JSON.parse(string);
          email_in_use = email;
          password_in_use = password;
          who = "pat";
        }
        return res.json({
          data: results
        })
      };
    });
  });
  
  module.exports=router;