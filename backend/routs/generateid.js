var {createEroor,express,path,mysql,cors,port,con,email_in_use,password_in_use,who,app} =require('./cretaeconnection');
var router=express.Router();
router.get('/genApptUID', (req, res) => {
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
  
  module.exports=router;