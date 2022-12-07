var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/MedHistView', (req, res) => {
  let params = req.query;
  let patientName = "'%" + params.name + "%'";
  let statement = `SELECT Name_of_Patient AS 'Name',
                    b.Id_of_Medical_History AS 'ID',
                    a.Email_of_Patient as email
                    FROM Patient_Information_Table a,Patients_Fill_History_Information_Table b
                    WHERE a.Email_of_Patient = b.Email_of_Patient
                    AND a.Email_of_Patient IN (SELECT Email_of_Patient from Patient_Attend_Appointments_Information_Table 
                    NATURAL JOIN Diagnose_Information_Table WHERE Email_of_Doctor="${email_in_use}")`;
  if (patientName != "")
    statement += " AND a.Name_of_Patient LIKE " + patientName
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