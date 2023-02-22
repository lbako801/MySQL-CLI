function cliPrompt() {
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
      },])
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
        case "View department budget":
          viewDepartmentBudget();
          break;
        case ">>EXIT CLI<<":
          console.log("Goodbye! Thanks for using this MySQL CLI!");
          process.exit();
          break;
      }
    });
}

module.exports = cliPrompt;
