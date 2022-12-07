var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/allDiagnoses', (req, res) => {
    let params = req.query;
    let email = params.patientEmail;
    let statement =`SELECT Date_of_Appointment as date,
    Email_of_Doctor as email,
    Concerns_of_Patient as concerns,
    Symptoms_of_Patient as symptoms,
    Diagnosis_of_Patient as diagnosis,
    Prescription_To_Patient as prescription
     FROM Appointment_Information_Table A 
     INNER JOIN (SELECT * from Patient_Attend_Appointments_Information_Table
       NATURAL JOIN Diagnose_Information_Table 
    WHERE Email_of_Patient=${email}) AS B ON A.Id_of_Appointment = B.Id_of_Appointment;`
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