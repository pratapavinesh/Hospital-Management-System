var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var port = 3001
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'avi',
  database: 'HospitalManagementSystem',
  multipleStatements: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Hospital Management System Database");
});
var email_in_use = "";
var password_in_use = "";
var who = "";
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
module.exports.createError = createError;
module.exports.express = express;
module.exports.path =path;
module.exports.mysql =mysql;
module.exports.cors =cors;
module.exports.port = 3001;
module.exports.con=con;
module.exports.email_in_use=email_in_use;
module.exports.password_in_use=email_in_use;
module.exports.who=who;
module.exports.app=app;
