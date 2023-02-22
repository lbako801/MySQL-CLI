USE employeeinfo_db;

INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Human Resources'),
(4, 'Engineering'),
(5, 'Finance');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Manager', 100000, 1),
(2, 'Sales Representative', 50000, 1),
(3, 'Marketing Manager', 110000, 2),
(4, 'Marketing Coordinator', 60000, 2),
(5, 'Human Resources Manager', 120000, 3),
(6, 'HR Specialist', 70000, 3),
(7, 'Software Engineer', 90000, 4),
(8, 'Web Developer', 75000, 4),
(9, 'Data Analyst', 80000, 4),
(10, 'Financial Analyst', 95000, 5),
(11, 'Accountant', 85000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Daenerys', 'Targaryen', 1, NULL),
(2, 'Tyrion', 'Lannister', 2, 1),
(3, 'Cersei', 'Lannister', 2, 1),
(4, 'Jon', 'Snow', 7, NULL),
(5, 'Arya', 'Stark', 8, 4),
(6, 'Sansa', 'Stark', 6, 5),
(7, 'Khal', 'Drogo', 2, 1),
(8, 'Samwell', 'Tarly', 9, 4),
(9, 'Gilly', NULL, 6, 8),
(10, 'Margaery', 'Tyrell', 3, 1),
(11, 'Olenna', 'Tyrell', 5, 10),
(12, 'Margot', 'Robbie', 4, NULL),
(13, 'Leonardo', 'DiCaprio', 11, NULL),
(14, 'Angelina', 'Jolie', 11, NULL),
(15, 'Tom', 'Hanks', 11, NULL);
