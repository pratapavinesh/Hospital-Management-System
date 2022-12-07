var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/checkIfPatientExists', (req, res) => {
    let params = req.query;
    let email = params.email;
    let statement = `SELECT a.Email_of_Patient as email,
                       a.Name_of_Patient as name,
                       a.Password_of_Patient as password,
                       a.Gender_of_Patient as gender,
                       a.Address_of_Patient as address
                      FROM Patient_Information_Table a
                      WHERE a.Email_of_Patient = "${email}"`;
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