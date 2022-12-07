var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/schedule', (req, res) => {
    let params = req.query;
    let time = params.time;
    let date = params.date;
    let id = params.id;
    let endtime = params.endTime;
    let concerns = params.concerns;
    let symptoms = params.symptoms;
    let doctor = params.doc;
    let ndate = new Date(date).toLocaleDateString().substring(0, 10)
    let sql_date = `STR_TO_DATE('${ndate}', '%d/%m/%Y')`;
    //sql to turn string to sql time obj
    let sql_start = `CONVERT('${time}', TIME)`;
    //sql to turn string to sql time obj
    let sql_end = `CONVERT('${endtime}', TIME)`;
    let sql_try = `INSERT INTO Appointment_Information_Table
                  (Id_of_Appointment, Date_of_Appointment, Starttime_of_Appointment, Endtime_of_Appointment, Status_of_Appointment) 
                   VALUES (${id}, ${sql_date}, ${sql_start}, ${sql_end}, "NotDone")`;
    console.log(sql_try);
    con.query(sql_try, function (error, results, fields) {
      if (error) throw error;
      else {
        let sql_try = `INSERT INTO Diagnose_Information_Table
                  (Id_of_Appointment, Email_of_Doctor, Diagnosis_of_Patient, Prescription_To_Patient) 
                   VALUES (${id}, "${doctor}", "Not Yet Diagnosed" , "Not Yet Diagnosed")`;
        console.log(sql_try);
        con.query(sql_try, function (error, results, fields) {
          if (error) throw error;
          else{
            return res.json({
              data: results
            })
          }
        });
      }
    });
  });
  
  module.exports=router;