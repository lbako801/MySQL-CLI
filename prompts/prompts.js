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
      },
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
              case "Add an employee":
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "first_name",
                      message: "What is the first name of the employee?",
                    },
                    {
                      type: "input",
                      name: "last_name",
                      message: "What is the last name of the employee?",
                    },
                    {
                      type: "input",
                      name: "role_id",
                      message: "What is the role ID for the employee?",
                    },
                    {
                      type: "input",
                      name: "manager_id",
                      message: "What is the manager ID for the employee?",
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
        case "Update an employee role":
          updateEmployeeRole().then(() => cliPrompt());
          break;
        case "Delete a department":
          deleteDepartment().then(() => cliPrompt());
          break;
        case "Delete a role":
          deleteRole().then(() => cliPrompt());
          break;
        case "Delete an employee":
          deleteEmployee().then(() => cliPrompt());
          break;
        case "View employees by manager":
          viewEmployeesByManager().then(() => cliPrompt());
          break;
        case "View employees by department":
          viewEmployeesByDepartment().then(() => cliPrompt());
          break;
        case "View department budget":
          viewDepartmentBudget().then(() => cliPrompt());
          break;
        case ">>EXIT CLI<<":
          console.log("Goodbye! Thanks for using this MySQL CLI!");
          process.exit();
          break;
      }
    });
}

module.exports = cliPrompt;
