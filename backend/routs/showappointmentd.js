var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/doctorViewAppt', (req, res) => {
  let a = req.query;
  let email = a.email;
  let statement = `SELECT a.Id_of_Appointment as id,
  a.Date_of_Appointment as date ,
   a.Starttime_of_Appointment as starttime ,
    a.Status_of_Appointment as status ,
     p.Name_of_Patient as name ,
      psa.Concerns_of_Patient as concerns,
    psa.Symptoms_of_Patient as symptoms
  FROM Appointment_Information_Table a, Patient_Attend_Appointments_Information_Table psa, Patient_Information_Table p
  WHERE a.Id_of_Appointment = psa.Id_of_Appointment AND psa.Email_of_Patient = p.Email_of_Patient
  AND a.Id_of_Appointment IN (SELECT Id_of_Appointment FROM Diagnose_Information_Table WHERE Email_of_Doctor="${email_in_use}")`;
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