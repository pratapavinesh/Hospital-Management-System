var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/makeDocAccount', (req, res) => {
    let params = req.query;
    let name = params.name + " " + params.lastname;
    let email = params.email;
    let password = params.password;
    let gender = params.gender;
    let schedule = params.schedule;
    let sql_statement = `INSERT INTO Doctor_Information_Table
                      (Email_of_Doctor,Name_of_Doctor, Gender_of_Doctor, Password_of_Doctor) 
                         VALUES ` + `("${email}", "${name}","${gender}", "${password}")`;
    console.log(sql_statement);
    con.query(sql_statement, function (error, results, fields) {
      if (error) throw error;
      else {
        let sql_statement = `INSERT INTO Doctors_Have_Schedules_Information_Table
                          (Id_of_Schedule, Email_of_Doctor) 
                         VALUES ` + `(${schedule}, "${email}")`;
        console.log(sql_statement);
        con.query(sql_statement, function(error){
          if (error){
            let sql_statement = `Delete from Doctor_Information_Table 
                  where Email_of_Doctor =`+ `"${email}"`;
            con.query(sql_statement, function(error){});
            window.alert('wrong schedule info');
            throw error;
          } 
        })
        email_in_use = email;
        password_in_use = password;
        who = 'doc';
        return res.json({
          data: results
        })
      };
    });
  });
  
  module.exports=router;