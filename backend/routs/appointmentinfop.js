var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/patientViewAppt', (req, res) => {
    let tmp = req.query;
    let email = tmp.email;
    let statement = `SELECT Patient_Attend_Appointments_Information_Table.Id_of_Appointment as ID,
    Patient_Attend_Appointments_Information_Table.Email_of_Patient as user, 
    Patient_Attend_Appointments_Information_Table.Concerns_of_Patient as theConcerns, 
    Patient_Attend_Appointments_Information_Table.Symptoms_of_Patient as theSymptoms, 
    Appointment_Information_Table.Date_of_Appointment as theDate,
    Appointment_Information_Table.Starttime_of_Appointment as theStart,
    Appointment_Information_Table.Endtime_of_Appointment as theEnd,
    Appointment_Information_Table.Status_of_Appointment as status
                    FROM Patient_Attend_Appointments_Information_Table, Appointment_Information_Table
                    WHERE Patient_Attend_Appointments_Information_Table.Email_of_Patient = "${email}" AND
                    Patient_Attend_Appointments_Information_Table.Id_of_Appointment = Appointment_Information_Table.Id_of_Appointment`;
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