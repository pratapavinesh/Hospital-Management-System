var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/checkIfApptExists', (req, res) => {
  let cond1, cond2, cond3 = ""
  let params = req.query;
  console.log(params);
  let email = params.email;
  let doc_email = params.docEmail;
  let startTime = params.startTime;
  let date = params.date;
  let ndate = new Date(date).toLocaleDateString().substring(0, 10)
  console.log(ndate);
  let sql_date = `STR_TO_DATE('${ndate}', '%d/%m/%Y')`;
  console.log(sql_date);
  let sql_start = `CONVERT('${startTime}', TIME)`;
  console.log(sql_start);
  let statement = `SELECT a.Id_of_Appointment as appt,
                          a.Email_of_Patient as patient,
                          a.Concerns_of_Patient as concerns,
                          a.Symptoms_of_Patient as symptoms,
                          b.Id_of_Appointment as id,
                          b.Date_of_Appointment as date,
                          b.Starttime_of_Appointment as starttime,
                          b.Endtime_of_Appointment as endtime,
                          b.Status_of_Appointment as status
  FROM Patient_Attend_Appointments_Information_Table a, Appointment_Information_Table  b 
  WHERE a.Email_of_Patient = "${email}" AND
  a.Id_of_Appointment =b.Id_of_Appointment AND
  Date_of_Appointment = ${sql_date} AND
  Starttime_of_Appointment = ${sql_start}`
  console.log(statement)
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      cond1 = results;
      statement=`SELECT 
      a.Id_of_Appointment as id,
      a.Date_of_Appointment as date,
      a.Starttime_of_Appointment as starttime,
      a.Endtime_of_Appointment as endtime,
      a.Status_of_Appointment as status,
      d.Id_of_Appointment as appt,
      d.Email_of_Doctor as doctor,
      d.Diagnosis_of_Patient as dignosis,
      d.Prescription_To_Patient as prescription
      FROM Diagnose_Information_Table d 
      INNER JOIN Appointment_Information_Table a 
      ON d.Id_of_Appointment=a.Id_of_Appointment
       WHERE Email_of_Doctor="${doc_email}" 
       AND a.Date_of_Appointment=${sql_date} 
       AND a.Status_of_Appointment="NotDone" 
      AND ${sql_start} >= a.Starttime_of_Appointment AND ${sql_start} < a.Endtime_of_Appointment`
      console.log(statement)
      con.query(statement, function (error, results, fields) {
        if (error) throw error;
        else {
          cond2 = results;
          statement = `SELECT Email_of_Doctor as email,
           Starttime_of_Schedule as starttime , 
           Endtime_of_Schedule as endtime , 
           Breaktime_of_Schedule as breaktime ,
           Day_of_Schedule as day
          FROM Doctors_Have_Schedules_Information_Table 
          INNER JOIN Schedule_Information_Table ON Doctors_Have_Schedules_Information_Table.Id_of_Schedule = Schedule_Information_Table.Id_of_Schedule
          WHERE Email_of_Doctor="${doc_email}" AND 
          Day_of_Schedule=DAYNAME(${sql_date}) AND 
          (DATE_ADD(${sql_start},INTERVAL +1 HOUR) <= Breaktime_of_Schedule OR ${sql_start} >= DATE_ADD(Breaktime_of_Schedule,INTERVAL +1 HOUR));`
          //not in doctor schedule
          console.log(statement)
          con.query(statement, function (error, results, fields) {
            if (error) throw error;
            else {
              console.log(results);
              if(results.length){
                results = []
              }
              else{
                results = [1]
              }
              return res.json({
                  data: cond1.concat(cond2,results)
              })
            };
          });
        };
      });
    };
  });
}) ;
  module.exports=router;