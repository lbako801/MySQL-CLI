const connection = require("./connection");

// function to view all departments
function viewAllDepartments() {
  connection
    .promise()
    .query("SELECT * FROM department")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch((err) => console.log(err));
}

// function to view all roles
function viewAllRoles() {
  connection
    .promise()
    .query("SELECT * FROM role")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch((err) => console.log(err));
}

// function to view all employees
function viewAllEmployees() {
  connection
    .promise()
    .query("SELECT * FROM employee")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch((err) => console.log(err));
}

function addDepartment(departmentName) {
  const query = `INSERT INTO department (name) VALUES ("${departmentName}")`;
  return connection.promise().query(query);
}

function addRole(title, salary, departmentId) {
  const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${departmentId})`;
  return connection.promise().query(query);
}

function addEmployee(firstName, lastName, roleId, managerId) {
  const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;
  return connection.promise().query(query);
}

function updateEmployeeRole(employeeId, roleId) {
  const query = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`;
  return connection.promise().query(query);
}

function deleteDepartment(departmentId) {
  const query = `DELETE FROM department WHERE id = ${departmentId}`;
  return connection.promise().query(query);
}

function deleteRole(roleId) {
  const query = `DELETE FROM role WHERE id = ${roleId}`;
  return connection.promise().query(query);
}

function deleteEmployee(employeeId) {
  const query = `DELETE FROM employee WHERE id = ${employeeId}`;
  return connection.promise().query(query);
}

function viewEmployeesByManager(managerId) {
  const query = `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager
    FROM employee AS e1
    INNER JOIN role ON e1.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
    WHERE e1.manager_id = ${managerId}`;
  return connection.promise().query(query);
}

function viewEmployeesByDepartment(departmentId) {
  const query = `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager
    FROM employee AS e1
    INNER JOIN role ON e1.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
    WHERE department.id = ${departmentId}`;
  return connection.promise().query(query);
}

function viewDepartmentBudget(departmentId) {
  const query = `SELECT department.name AS department, SUM(role.salary) AS utilized_budget
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    WHERE department.id = ${departmentId}
    GROUP BY department.id`;
  return connection.promise().query(query);
}
