const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeinfo_db'
});
  
module.exports = connection;