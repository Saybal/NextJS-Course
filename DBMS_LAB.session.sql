CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    role VARCHAR(50) NOT NULL,
    join_date DATE NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);


INSERT INTO Department VALUES (1, 'IT'), (2, 'HR'), (3, 'Finance');

INSERT INTO Employee VALUES
(101, 'Alice', 60000.00, 'Developer', '2022-01-10', 1),
(102, 'Bob', 50000.00, 'Tester', '2021-03-15', 1),
(103, 'Charlie', 70000.00, 'Manager', '2020-07-01', 2),
(104, 'David', 40000.00, 'Clerk', '2023-02-20', 3),
(105, 'Eve', 65000.00, 'Developer', '2022-05-18', 1);

-- Retrieve all employees whose salary is greater than 50,000.
SELECT * FROM Employee WHERE salary > 50000;

-- Display all unique roles from the Employee table.
SELECT DISTINCT role FROM Employee;

-- Find employees whose name starts with the letter ’A’.
SELECT * FROM Employee WHERE name LIKE 'A%';

-- Show all employees sorted by salary in descending order.
SELECT * FROM Employee ORDER BY salary DESC;

-- Retrieve employees who belong to the IT department AND have salary greater than 55,000.
SELECT * FROM Employee WHERE dept_id = 1 AND salary > 55000;

-- Retrieve employees whose role is ’Manager’ OR salary is less than 45,000.
SELECT * FROM Employee WHERE role = 'Manager' OR salary < 45000;

-- Find employees who are NOT Developers.
SELECT * FROM Employee WHERE role != 'Developer';

--Insert a new employee record of your choice.
INSERT INTO Employee VALUES (106, 'Saybal', 75000.00, 'Web Developer', '2024-06-01', 1);

SELECT * FROM Employee;

--   Update salary by increasing 10% for all Developers.
UPDATE Employee SET salary = salary + (salary * 0.10) WHERE role = 'Developer';

-- Delete employees who joined before the year 2021.
DELETE FROM Employee WHERE join_date < '2021-01-01';

-- Find the total salary of all employees.
SELECT SUM(salary) AS Total_Salary FROM Employee;

-- Find the average salary of employees.
SELECT AVG(salary) AS Average_Salary FROM Employee;

-- Find the maximum and minimum salary.
SELECT MAX(salary) AS Max_Salary, MIN(salary) AS Min_Salary FROM Employee;

-- Find the second highest salary from the Employee table.
SELECT MAX(salary) AS Second_Highest_Salary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);

-- List employees whose salary is above overall average but below department average.
SELECT * FROM Employee WHERE salary > (SELECT AVG(salary) FROM Employee) AND salary < (SELECT AVG(salary) FROM Employee WHERE dept_id = Employee.dept_id);