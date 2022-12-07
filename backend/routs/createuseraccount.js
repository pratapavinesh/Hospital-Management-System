var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/makeAccount', (req, res) => {
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
  module.exports=router;