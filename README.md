# MySQL-CLI- AN Employee Database Management System
Welcome to the Employee Database Management System! This is a command-line application that allows business owners to view and manage the departments, roles, and employees in their company. With this application, you can easily organize and plan your business.
# Table of Contents
- [MySQL-CLI- AN Employee Database Management System](#mysql-cli--an-employee-database-management-system)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Demo and Screenshots](#demo-and-screenshots)
- [Author](#author)

# Installation
To use the Employee Database Management System, you will need to have Node.js, MySQL2, Inquirer, and console.table installed on your computer. If you do not already have these packages installed, you can run the following command in your terminal to install them:
```
npm install
```
Once you have installed the necessary packages, you can clone this repository to your local machine with the following command:
```
git@github.com:lbako801/MySQL-CLI.git
```

# Usage 
To use the Employee Database Management System, follow these steps:

1. Open your terminal and navigate to the root of the project directory.

2. Start the application by running the following command:
```
npm run clipro
```
3. You will be presented with a menu of options. Select the option you want to use by using the arrow keys to navigate and the Enter key to select.

4. If you select an option that requires input, such as adding a department or updating an employee role, you will be prompted to enter the necessary information.

5. Once you have completed your desired action, you can select the "Exit" option to end the application.

# Features
The Employee Database Management System includes the following features:

 - View all departments
 - View all roles
 - View all employees
 - Add a department
 - Add a role
 - Add an employee
 - Update an employee role

You can use these features to manage your company's employee database with ease.

In addition to the required features, the Employee Database Management System includes the following bonus features:

 - Update employee managers
 - View employees by manager
 - View employees by department
 - Delete departments, roles, and employees
 - View the total utilized budget of a department

These bonus features provide additional functionality and allow you to more effectively manage your company's employee database.

# Database Schema

The Employee Database Management System uses a MySQL database with the following schema:

`department`
 - `id`: INT PRIMARY KEY
 - `name`: VARCHAR(30) to hold department name

`role`
 - `id`: INT PRIMARY KEY
 - `title`: VARCHAR(30) to hold role title
 - `salary`: DECIMAL to hold role salary
 - `department_id`: INT to hold reference to department role belongs to

`employee`
 - `id:` INT PRIMARY KEY
 - `first_name`: VARCHAR(30) to hold employee first name
 - `last_name`: VARCHAR(30) to hold employee last name
 - `role_id`: INT to hold reference to employee role
 - `manager_id`: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

This database schema allows you to easily store and manage information about your company's departments, roles, and employees.
# Demo and Screenshots
Demo Video - [VIDEO]()
# Author
This Employee Database Management System was developed by [Loren Bako (me)](https://github.com/lbako801). If you have any questions or feedback, please contact me at loren@lorenbako.com or visit my website at [lorenbako.com](https://lorenbako.com). 

Thank you for using my application!
