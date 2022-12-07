var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/getDateTimeOfAppt', (req, res) => {
    let tmp = req.query;
    let id = tmp.id;
    let statement = `SELECT Starttime_of_Appointment as start, 
                      Endtime_of_Appointment as end, 
                      Date_of_Appointment as theDate 
                     FROM Appointment_Information_Table 
                     WHERE Id_of_Appointment = "${id}"`;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
      else {
        console.log(JSON.stringify(results));
        return res.json({
          data: results
        })
      };
    });
  });
  module.exports=router;