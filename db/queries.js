const connection = require('./connection');

// function to view all departments
function viewAllDepartments() {
  connection
    .promise()
    .query("SELECT * FROM department")
    .then(([rows, fields]) => {
      console.log("");

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
      console.log("");

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
      console.log("");
      console.table(rows);
    })
    .catch((err) => console.log(err));
}

function addDepartment(departmentName) {
  const query = `INSERT INTO department (name) VALUES ("${departmentName}")`;
  return connection.promise().query(query)
    .then(() => {
      console.log("");
      console.log(`Added department: ${departmentName}`);
    });
}

// function to add a role
function addRole(title, salary, departmentId) {
  const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${departmentId})`;
  console.log("");
  console.log(`Adding role "${title}" with salary $${salary} to department ID ${departmentId}...`);
  return connection.promise().query(query).catch((error) => {
    if (error.errno === 1264) {
      console.log("");
      console.log(`Error: Salary - $${salary} is too high! The maximum salary is $${Number.MAX_SAFE_INTEGER}.`);
    } else {
      throw error;
    }
  });
}
// function to add an employee

function addEmployee(firstName, lastName, roleId, managerId) {
  const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;
  return connection.promise().query(query)
    .then(() => {
      console.log("");
      console.log(`Employee ${firstName} ${lastName} has been added with role ID ${roleId} and manager ID ${managerId}`);
    });
}

//' function to update an employee

function updateEmployeeRole(employeeId, roleId) {
  const getEmployeeNameQuery = `SELECT CONCAT(first_name, " ", last_name) AS name FROM employee WHERE id = ${employeeId}`;
  const updateEmployeeRoleQuery = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`;

  return connection.promise().query(getEmployeeNameQuery)
    .then(([rows]) => {
      const employeeName = rows[0].name;
      console.log("");
      console.log(`Updating role for employee: ${employeeName}`);
      return connection.promise().query(updateEmployeeRoleQuery);
    })
    .then(() => {
      console.log("");
      console.log(`Employee role updated successfully.`);
      
    });
}


function deleteDepartment(departmentId) {
  const query = `DELETE FROM department WHERE id = ${departmentId}`;
  return connection.promise().query(query);
}

function deleteRole(roleId) {
  const selectQuery = `SELECT * FROM employee WHERE role_id = ${roleId}`;
  return connection.promise().query(selectQuery)
    .then(([rows]) => {
      const updateQueries = rows.map((employee) => {
        return `UPDATE employee SET role_id = NULL WHERE id = ${employee.id}`;
      });
      return Promise.all(updateQueries.map((query) => connection.promise().query(query)));
    })
    .then(() => {
      const deleteQuery = `DELETE FROM role WHERE id = ${roleId}`;
      return connection.promise().query(deleteQuery);
    })
    .catch((error) => {
      console.log("");
      console.log(`Error deleting role: ${error}`);
    });
}

function deleteEmployee(employeeId) {
  const selectQuery = `SELECT * FROM employee WHERE id = ${employeeId}`;
  return connection.promise().query(selectQuery)
    .then(([rows]) => {
      const employee = rows[0];
      console.log("");

      console.log(`Deleting employee: ${employee.first_name} ${employee.last_name}`);
      const updateQuery = `UPDATE employee SET manager_id = NULL WHERE manager_id = ${employeeId}`;
      return connection.promise().query(updateQuery);
    })
    .then(() => {
      const deleteQuery = `DELETE FROM employee WHERE id = ${employeeId}`;
      return connection.promise().query(deleteQuery);
    })
    .catch((error) => {
      console.log("");
      console.log(`Error deleting employee: ${error}`);
    });
}

function viewEmployeesByManager(managerId) {
  const query = `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager
    FROM employee AS e1
    INNER JOIN role ON e1.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
    WHERE e1.manager_id = ${managerId}`;
  return connection.promise().query(query)
    .then(([rows]) => {
      console.log("");

      console.table(rows);
      return rows;

    });
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
  FROM department
  JOIN role ON role.department_id = department.id
  JOIN employee ON employee.role_id = role.id
  WHERE department.id = ${departmentId}
  GROUP BY department.id`;
  return connection.promise().query(query);
}

module.exports = { 
  viewAllDepartments, 
  viewAllRoles, 
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  viewDepartmentBudget
};