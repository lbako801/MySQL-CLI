function cliPrompt() {
  const inquirer = require("inquirer");

  const {
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
    viewDepartmentBudget,
  } = require("../db/queries");

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What action would you like to perform?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
          "View employees by manager",
          "View employees by department",
          "View department budget",
          ">>EXIT CLI<<",
        ],
      }
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Add a department":
          inquirer
            .prompt({
              type: "input",
              name: "departmentName",
              message: "What is the name of the department?",
            })
            .then((answers) => {
              addDepartment(answers.departmentName).then(() => cliPrompt());
            });
          break;
        case "Add a role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "What is the title of the role?",
              },
              {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
              },
              {
                type: "input",
                name: "department_id",
                message: "What is the department ID for the role?",
              },
            ])
            .then((answers) => {
              addRole(
                answers.title,
                answers.salary,
                answers.department_id
              ).then(() => cliPrompt());
            });
          break;
        case "Add an employee":
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
              },
              {
                type: "input",
                name: "role_id",
                message: "What is the role ID for the employee?",
              },
              {
                type: "input",
                name: "manager_id",
                message: "What is the manager ID for the employee? (optional)",
                default: null,
              },
            ])
            .then((answers) => {
              addEmployee(
                answers.first_name,
                answers.last_name,
                answers.role_id,
                answers.manager_id
              ).then(() => cliPrompt());
            });
          break;
        case "Update an employee role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "employee_id",
                message: "What is the ID of the employee?",
              },
              {
                type: "input",
                name: "new_role_id",
                message: "What is the new role ID for the employee?",
              },
            ])
            .then((answers) => {
              updateEmployeeRole(answers.employee_id, answers.new_role_id).then(
                () => cliPrompt()
              );
            });
          break;
        case "View all departments":
          viewAllDepartments();
          cliPrompt();
          break;
        case "View all roles":
          viewAllRoles();
          cliPrompt();
          break;
        case "View all employees":
          viewAllEmployees();
          cliPrompt();
          break;
        case "Delete a role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "role_id",
                message: "What is the ID of the role you want to delete?",
              },
            ])
            .then((answers) => {
              deleteRole(answers.role_id).then(() => cliPrompt());
            }) .catch((error) => {
              console.log('Cannot delete a role with employees active! Fire them first!');
              cliPrompt();
            });
          break;
        case "Delete an employee":
          inquirer
            .prompt([
              {
                type: "input",
                name: "employee_id",
                message: "What is the ID of the employee you want to delete?",
              },
            ])
            .then((answers) => {
              deleteEmployee(answers.employee_id).then(() => cliPrompt());
            }).catch((error) => {
              console.log('Cannot delete an manager overseeing employees! Reassign them first!');
              cliPrompt();
            });
          break;
        case "View employees by manager":
          inquirer
            .prompt([
              {
                type: "input",
                name: "manager_id",
                message:
                  "What is the ID of the manager you want to view employees for?",
              },
            ])
            .then((answers) => {
              viewEmployeesByManager(answers.manager_id).then(() =>
                cliPrompt()
              );
            });
          break;
        case "Delete a department":
          inquirer
            .prompt({
              type: "input",
              name: "departmentId",
              message:
                "What is the ID of the department you would like to delete?",
            })
            .then((answers) => {
              deleteDepartment(answers.departmentId)
                .then(() => {
                  console.log("Department deleted successfully.");
                  cliPrompt();
                })
                .catch((error) => {
                  console.log('Cannot delete department with employees! Fire all employees first you monster!');
                  cliPrompt();
                });
            });
          break;
          case "View employees by department":
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "department_id",
                  message:
                    "What is the ID of the department you want to view employees for?",
                },
              ])
              .then((answers) => {
                viewEmployeesByDepartment(answers.department_id).then(([rows]) => {
                  if (rows.length > 0) {
                    console.table(rows);
                  } else {
                    console.log(`No employees found for department with ID ${answers.department_id}.`);
                  }
                  cliPrompt();
                }).catch((error) => {
                  console.log(`Error retrieving employees by department: ${error}`);
                  cliPrompt();
                });
              });
            break;
          case "View department budget":
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "department_id",
                  message:
                    "What is the ID of the department you want to view budget for?",
                },
              ])
              .then((answers) => {
                viewDepartmentBudget(answers.department_id).then(([rows]) => {
                  if (rows.length > 0) {
                    console.log(`Department: ${rows[0].department}`);
                    console.log(`Utilized budget: ${rows[0].utilized_budget}`);
                  } else {
                    console.log(`No budget information found for department with ID ${answers.department_id}.`);
                  }
                  cliPrompt();
                }).catch((error) => {
                  console.log(`Error retrieving department budget: ${error}`);
                  cliPrompt();
                });
              });
            break;
        case ">>EXIT CLI<<":
          console.log("Goodbye! Thanks for using this MySQL CLI!");
          process.exit();
          break;
      }
    });
}

module.exports = cliPrompt;
