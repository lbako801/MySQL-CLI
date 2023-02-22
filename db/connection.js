const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4545',
    database: 'employeeinfo_db'
});
  
module.exports = connection;