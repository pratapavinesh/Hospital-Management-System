var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/OneHistory', (req, res) => {
    let params = req.query;
    let email = params.patientEmail;
    console.log(params)
    let statement = `SELECT Gender_of_Patient as gender,
                      Name_of_Patient as name ,
                      b.Email_of_Patient as email,
                      Address_of_Patient as address,
                      Conditions_of_Patient as conditions,
                      Surgeries_of_Patient as surgeries,
                      Medication_of_Patient as medication
                      FROM Patients_Fill_History_Information_Table a,
                      Patient_Information_Table b ,
                      Medical_History_of_Patient c
                      WHERE a.Id_of_Medical_History = c.Id_of_Medical_History
                      AND b.Email_of_Patient = a.Email_of_Patient AND b.Email_of_Patient = ` + email;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
      else {
        return res.json({
          data: results
        })
      }
    })
  });
  
  module.exports=router;