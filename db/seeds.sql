INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Marketing'),
(3, 'Sales');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Software Engineer', 120000, 1),
(2, 'Backend Engineer', 100000, 1),
(3, 'Frontend Engineer', 90000, 1),
(4, 'DevOps Engineer', 110000, 1),
(5, 'Data Analyst', 95000, 1),
(6, 'Digital Marketer', 75000, 2),
(7, 'Content Creator', 65000, 2),
(8, 'Marketing Analyst', 85000, 2),
(9, 'HR Generalist', 80000, 3),
(10, 'HR Manager', 120000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Neo', 'Anderson', 1, null),
(2, 'Trinity', 'Trinity', 2, 1),
(3, 'John', 'Wick', 1, null),
(4, 'Morpheus', 'Morpheus', 1, 1),
(5, 'Hacker', 'McHackerface', 2, 1),
(6, 'Keanu', 'Reeves', 1, 3),
(7, 'Simone', 'Giertz', 5, 1),
(8, 'Randall', 'Munroe', 3, 1),
(9, 'Lena', 'Green', 6, 2),
(10, 'Tim', 'Berners-Lee', 8, 2),
(11, 'Seymour', 'Cray', 4, 1),
(12, 'Alan', 'Kay', 1, 2);
(13, 'Elon', 'Musk', 7, null),
(14, 'Leeroy', 'Jenkins', 2, 1);