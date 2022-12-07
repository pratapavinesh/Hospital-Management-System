var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/deleteAppt', (req, res) => {
    let a = req.query;
    let uid = a.uid;
    let statement = `SELECT Status_of_Appointment as status
     FROM Appointment_Information_Table WHERE Id_of_Appointment=${uid};`;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
      else {
        results = results[0].status
        if(results == "NotDone"){
          statement = `DELETE FROM Appointment_Information_Table WHERE Id_of_Appointment=${uid};`;
         console.log(statement);
          con.query(statement, function (error, results, fields) {
            if (error) throw error;
          });
        }
        else{
          if(who=="pat"){
            statement = `DELETE FROM Patient_Attend_Appointments_Information_Table p WHERE p.Id_of_Appointment = ${uid}`;
            console.log(statement);
            con.query(statement, function (error, results, fields) {
              if (error) throw error;
            });
          }
        }
      };
    });
    return;
  });
  
  module.exports=router;