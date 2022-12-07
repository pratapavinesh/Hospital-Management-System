var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/checkIfHistory', (req, res) => {
    let params = req.query;
    let email = params.email;
    let statement = `SELECT Email_of_Patient as email
     FROM Patients_Fill_History_Information_Table
      WHERE Email_of_Patient = ` + email;
    console.log(statement)
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