const all = `
SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.department_name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
`;

const manager = `
SELECT DISTINCT manager.id, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN employee manager ON employee.manager_id = manager.id
`;

const salaryTotal = `
SELECT 
	department.id,
    department.department_name AS department,
    role.salary
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
`;

module.exports = {
    all,
    manager,
    salaryTotal
}