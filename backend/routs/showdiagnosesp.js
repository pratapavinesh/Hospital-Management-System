var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/showDiagnoses', (req, res) => {
    let id = req.query.id;
    let statement = `SELECT  d.Id_of_Appointment as appt,
    d.Email_of_Doctor as doctor,
    d.Diagnosis_of_Patient as dignosis,
    d.Prescription_To_Patient as prescription
    FROM Diagnose_Information_Table d
     WHERE Id_of_Appointment=${id}`;
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