var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/checkDoclogin', (req, res) => {
    let params = req.query;
    let email = params.email;
    let password = params.password;
    let sql_statement = `SELECT a.Email_of_Doctor as email,
                        a.Name_of_Doctor as name,
                        a.Gender_of_Doctor as gender,
                        a.Password_of_Doctor as password
                        FROM Doctor_Information_Table a 
                         WHERE a.Email_of_Doctor="${email}" AND a.Password_of_Doctor="${password}"`;
    console.log(sql_statement);
    con.query(sql_statement, function (error, results, fields) {
      if (error) {
        console.log("eror");
        return res.status(500).json({ failed: 'error ocurred' })
      }
      else {
        if (results.length === 0) {
        } else {
          var string = JSON.stringify(results);
          var json = JSON.parse(string);
          email_in_use = json[0].email;
          password_in_use = json[0].password;
          who="doc";
          console.log(email_in_use);
          console.log(password_in_use);
        }
        return res.json({
          data: results
        })
      };
    });
  });
  
  module.exports=router;