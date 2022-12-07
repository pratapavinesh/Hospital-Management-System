var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/addToPatientSeeAppt', (req, res) => {
  let params = req.query;
  let email = params.email;
  let appt_id = params.id;
  let concerns = params.concerns;
  let symptoms = params.symptoms;
  let sql_try = `INSERT INTO Patient_Attend_Appointments_Information_Table
                       (Id_of_Appointment,Email_of_Patient, Concerns_of_Patient, Symptoms_of_Patient) 
                     VALUES (${appt_id}, "${email}","${concerns}", "${symptoms}")`;
  console.log(sql_try);
  con.query(sql_try, function (error, results, fields) {
    if (error) throw error;
    else{
      return res.json({
        data: results
      })
    }
  });

});
  
  module.exports=router;