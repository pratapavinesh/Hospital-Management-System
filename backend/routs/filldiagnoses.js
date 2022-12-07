var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/diagnose', (req, res) => {
  let params = req.query;
  let id = params.id;
  let diagnosis = params.diagnosis;
  let prescription = params.prescription;
  let statement = `UPDATE Diagnose_Information_Table 
  SET Diagnosis_of_Patient="${diagnosis}",
   Prescription_To_Patient="${prescription}"
    WHERE Id_of_Appointment=${id}`;
  console.log(statement)
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let statement = `UPDATE Appointment_Information_Table
       SET Status_of_Appointment="Done"
        WHERE Id_of_Appointment=${id}`;
      console.log(statement)
      con.query(statement, function (error, results, fields){
        if (error) throw error;
      })
    };
  });
});
  
  module.exports=router;