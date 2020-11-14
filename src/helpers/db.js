const mysql = require('mysql')

const {DB_CONN} = require('../config.json')

const db = mysql.createConnection(DB_CONN);

db.connect(function(err) {
  if (err) throw err;
  console.log("Mysql Connected!");
});

module.exports=db
