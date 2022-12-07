var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./routs/cretaeconnection');

//Login Page queries

//Checks if patient exists
app.get('/checkIfPatientExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT a.Email_of_Patient as email,
                     a.Name_of_Patient as name,
                     a.Password_of_Patient as password,
                     a.Gender_of_Patient as gender,
                     a.Address_of_Patient as address
                    FROM Patient_Information_Table a
                    WHERE a.Email_of_Patient = "${email}"`;
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


//Creates patient Account
app.get('/makeAccount', (req, res) => {
  let query = req.query;
  let name = query.name + " " + query.lastname;
  let email = query.email;
  let password = query.password;
  let address = query.address;
  let gender = query.gender;
  let medications = query.medications;
  let conditions = query.conditions;
  let surgeries = query.surgeries;
  if(medications===undefined){
    medications="none"
  }
  if(conditions===undefined){
    conditions="none"
  }
  if(!surgeries===undefined){
    surgeries="none"
  }
  let sql_statement = `INSERT INTO Patient_Information_Table 
  (Email_of_Patient, Name_of_Patient,Password_of_Patient,Gender_of_Patient,Address_of_Patient) 
   VALUES ` + `("${email}", "${name}", "${password}" , "${gender}","${address}")`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      email_in_use = email;
      password_in_use = password;
      who="pat";
      return res.json({
        data: results
      })
    };
  });
  sql_statement=`SELECT a.Id_of_Medical_History as id
                 FROM Medical_History_of_Patient a
                ORDER BY a.Id_of_Medical_History DESC LIMIT 1`;
  console.log(sql_statement)
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let generated_id = results[0].id + 1;
      let sql_statement = `INSERT INTO Medical_History_of_Patient
       (Id_of_Medical_History,Date_of_Visit, Conditions_of_Patient, Surgeries_of_Patient, Medication_of_Patient) 
      VALUES ` + `("${generated_id}", curdate(), "${conditions}", "${surgeries}", "${medications}")`;
      console.log(sql_statement)
      con.query(sql_statement, function (error, results, fields) {
        if (error) throw error;
        else {
          let sql_statement = `INSERT INTO Patients_Fill_History_Information_Table 
          (Email_of_Patient, Id_of_Medical_History) 
          VALUES ` + `("${email}",${generated_id})`;
          console.log(sql_statement);
          con.query(sql_statement, function (error, results, fields) {
            if (error) throw error;
            else {};
          });
        };
      });
    };
  });
});

//Checks If Doctor Exists
app.get('/checkIfDocExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT a.Email_of_Doctor as email,
                a.Name_of_Doctor as name,
                a.Gender_of_Doctor as gender,
                a.Password_of_Doctor as password
              FROM Doctor_Information_Table a 
               WHERE a.Email_of_Doctor = "${email}"`;
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

//Makes Doctor Account
app.get('/makeDocAccount', (req, res) => {
  let params = req.query;
  let name = params.name + " " + params.lastname;
  let email = params.email;
  let password = params.password;
  let gender = params.gender;
  let schedule = params.schedule;
  let sql_statement = `INSERT INTO Doctor_Information_Table
                    (Email_of_Doctor,Name_of_Doctor, Gender_of_Doctor, Password_of_Doctor) 
                       VALUES ` + `("${email}", "${name}","${gender}", "${password}")`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let sql_statement = `INSERT INTO Doctors_Have_Schedules_Information_Table
                        (Id_of_Schedule, Email_of_Doctor) 
                       VALUES ` + `(${schedule}, "${email}")`;
      console.log(sql_statement);
      con.query(sql_statement, function(error){
        if (error){
          let sql_statement = `Delete from Doctor_Information_Table 
                where Email_of_Doctor =`+ `"${email}"`;
          con.query(sql_statement, function(error){});
          window.alert('wrong schedule info');
          throw error;
        } 
      })
      email_in_use = email;
      password_in_use = password;
      who = 'doc';
      return res.json({
        data: results
      })
    };
  });
});

//Checks if patient is logged in
app.get('/checklogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  
  let sql_statement = `SELECT a.Email_of_Patient as email,
                     a.Name_of_Patient as name,
                     a.Password_of_Patient as password,
                     a.Gender_of_Patient as gender,
                      a.Address_of_Patient as address
                      FROM Patient_Information_Table a
                       WHERE a.Email_of_Patient="${email}" 
                       AND a.Password_of_Patient="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("error");
      return res.status(500).json({ failed: 'error ocurred' })
    }
    else {
      if (results.length === 0) {
      } else {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        email_in_use = email;
        password_in_use = password;
        who = "pat";
      }
      return res.json({
        data: results
      })
    };
  });
});

//Checks if doctor is logged in
app.get('/checkDoclogin', (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT a.Email_of_Doctor as email,
                      a.Name_of_Doctor as name,
                      a.Gender_of_Doctor as gender,
                      a.Password_of_Doctor as password
                      FROM Doctor_Information_Table a 
                       WHERE a.Email_of_Doctor="${email}" AND a.Password_of_Doctor="${password}"`;
  console.log(sql_statement);
  con.query(sql_statement, function (error, results, fields) {
    if (error) {
      console.log("eror");
      return res.status(500).json({ failed: 'error ocurred' })
    }
    else {
      if (results.length === 0) {
      } else {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        email_in_use = json[0].email;
        password_in_use = json[0].password;
        who="doc";
        console.log(email_in_use);
        console.log(password_in_use);
      }
      return res.json({
        data: results
      })
    };
  });
});


// Patient Dashboard Queries

//To return a particular patient history
app.get('/OneHistory', (req, res) => {
  let params = req.query;
  let email = params.patientEmail;
  let statement = `SELECT Gender_of_Patient as gender,
                    Name_of_Patient as name ,
                    b.Email_of_Patient as email,
                    Address_of_Patient as address,
                    Conditions_of_Patient as conditions,
                    Surgeries_of_Patient as surgeries,
                    Medication_of_Patient as medication
                    FROM Patients_Fill_History_Information_Table a,
                    Patient_Information_Table b ,
                    Medical_History_of_Patient c
                    WHERE a.Id_of_Medical_History = c.Id_of_Medical_History
                    AND b.Email_of_Patient = a.Email_of_Patient AND b.Email_of_Patient = ` + email;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    }
  })
});

//To Show all diagnosed appointments till now
app.get('/allDiagnoses', (req, res) => {
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

//Returns Appointment Info To patient logged In
app.get('/patientViewAppt', (req, res) => {
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

//To show diagnoses to patient
app.get('/showDiagnoses', (req, res) => {
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

//To delete appointment
app.get('/deleteAppt', (req, res) => {
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

//to get all doctor names
app.get('/docInfo', (req, res) => {
  let statement = `SELECT a.Email_of_Doctor as email,
          a.Name_of_Doctor as name,
         a.Gender_of_Doctor as gender,
          a.Password_of_Doctor as password
          FROM Doctor_Information_Table a`;
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

//Checks If a similar appointment exists to avoid a clash
app.get('/checkIfApptExists', (req, res) => {
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

//Generates ID for appointment
app.get('/genApptUID', (req, res) => {
  let statement = `SELECT Id_of_Appointment as id
   FROM Appointment_Information_Table 
   ORDER BY Id_of_Appointment DESC LIMIT 1`;
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      let generated_id = results[0].id + 1;
      return res.json({ id: `${generated_id}` });
    };
  });
});

//Schedules Appointment
app.get('/schedule', (req, res) => {
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

//Adds to PatientsAttendAppointment Table
app.get('/addToPatientSeeAppt', (req, res) => {
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

//Resets Patient Password
app.post('/resetPasswordPatient', (req, res) => {
  let something = req.query;
  let email = something.email;
  let oldPassword = "" + something.oldPassword;
  let newPassword = "" + something.newPassword;
  let statement = `UPDATE Patient_Information_Table 
                   SET Password_of_Patient = "${newPassword}" 
                   WHERE Email_of_Patient = "${email}" 
                   AND Password_of_Patient = "${oldPassword}";`;
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






// Doctor dashboard Queries

//To show appointments to doctor
app.get('/doctorViewAppt', (req, res) => {
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

//To fill diagnoses
app.get('/diagnose', (req, res) => {
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

//To show all patients whose medical history can be accessed
app.get('/MedHistView', (req, res) => {
  let params = req.query;
  let patientName = "'%" + params.name + "%'";
  let statement = `SELECT Name_of_Patient AS 'Name',
                    b.Id_of_Medical_History AS 'ID',
                    a.Email_of_Patient as email
                    FROM Patient_Information_Table a,Patients_Fill_History_Information_Table b
                    WHERE a.Email_of_Patient = b.Email_of_Patient
                    AND a.Email_of_Patient IN (SELECT Email_of_Patient from Patient_Attend_Appointments_Information_Table 
                    NATURAL JOIN Diagnose_Information_Table WHERE Email_of_Doctor="${email_in_use}")`;
  if (patientName != "")
    statement += " AND a.Name_of_Patient LIKE " + patientName
  console.log(statement)
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    };
  });
});

//To return a particular patient history
app.get('/OneHistory', (req, res) => {
  let params = req.query;
  let email = params.patientEmail;
  let statement = `SELECT Gender_of_Patient as gender,
                    Name_of_Patient as name ,
                    b.Email_of_Patient as email,
                    Address_of_Patient as address,
                    Conditions_of_Patient as conditions,
                    Surgeries_of_Patient as surgeries,
                    Medication_of_Patient as medication
                    FROM Patients_Fill_History_Information_Table a,
                    Patient_Information_Table b ,
                    Medical_History_of_Patient c
                    WHERE a.Id_of_Medical_History = c.Id_of_Medical_History
                    AND b.Email_of_Patient = a.Email_of_Patient AND b.Email_of_Patient = ` + email;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    else {
      return res.json({
        data: results
      })
    }
  })
});

//Resets Doctor Password
app.post('/resetPasswordDoctor', (req, res) => {
  let something = req.query;
  let email = something.email;
  let oldPassword = "" + something.oldPassword;
  let newPassword = "" + something.newPassword;
  let statement = `UPDATE Doctor_Information_Table
                   SET Password_of_Doctor = "${newPassword}" 
                   WHERE Email_of_Doctor = "${email}" 
                   AND Password_of_Doctor = "${oldPassword}";`;
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


///////////////////////////////////
//Returns Who is Logged in
app.get('/userInSession', (req, res) => {
  return res.json({ email: `${email_in_use}`, who:`${who}`});
});

//Logs the person out
app.get('/endSession', (req, res) => {
  console.log("Ending session");
  email_in_use = "";
  password_in_use = "";
});

//Returns Date/Time of Appointment
app.get('/getDateTimeOfAppt', (req, res) => {
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

//Checks if history exists
app.get('/checkIfHistory', (req, res) => {
    let params = req.query;
    let email = params.email;
    let statement = `SELECT Email_of_Patient as email
     FROM Patients_Fill_History_Information_Table
      WHERE Email_of_Patient = ` + email;
    console.log(statement)
    con.query(statement, function (error, results, fields) {
        if (error) throw error;
        else {
            return res.json({
                data: results
            })
        };
    });
});



//To show diagnoses
app.get('/showDiagnoses', (req, res) => {
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

// If 404, forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening on port ${port} `);
});

module.exports = app;