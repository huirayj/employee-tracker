const inquirer = require('inquirer');
const mysql = require('mysql');
const util = require('util')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

const queryAsync = util.promisify(connection.query).bind(connection);
const choices = [
    // {
    //     name: "View All Departments",
    //     value: "VIEW_DEPARTMENTS"
    // },
    // {
    //     name: "View All Roles",
    //     value: "VIEW_ROLES"
    // },
    // {
    //     name: "View All Employees",
    //     value: "VIEW_EMPLOYEES"
    // },
    // {
    //     name: "View All Employees By Department",
    //     value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    // },
    // {
    //     name: "View All Employees By Manager",
    //     value: "VIEW_EMPLOYEES_BY_MANAGER"
    // },
    // {
    //     name: "Add Department",
    //     value: "ADD_DEPARTMENT"
    // },
    // {
    //     name: "Add Role",
    //     value: "ADD_ROLE"
    // },
    // {
    //     name: "Add Employee",
    //     value: "ADD_EMPLOYEE"
    // },
    // {
    //     name: "Remove Department",
    //     value: "REMOVE_DEPARTMENT"
    // },
    // {
    //     name: "Remove Role",
    //     value: "REMOVE_ROLE"
    // },
    // {
    //     name: "Remove Employee",
    //     value: "REMOVE_EMPLOYEE"
    // },
    // {
    //     name: "Update Employee Role",
    //     value: "UPDATE_EMPLOYEE_ROLE"
    // },
    // {
    //     name: "Update Employee Manager",
    //     value: "UPDATE_EMPLOYEE_MANAGER"
    // },
    // {
    //     name: "Quit",
    //     value: "QUIT"
    // }
];

let statement = `
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

const init = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do? ',
            name: 'choice',
            choices: choices
        }
    ]);
    switch (answer.choice) {
        case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
        case "VIEW_ROLES":
            viewRoles();
            break;
        case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            viewByDepartment();
            break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
            viewByManager();
            break;
        case "ADD_DEPARTMENT":
            addDepartment();
            break;
        case "ADD_ROLE":
            addRole();
            break;
        case "ADD_EMPLOYEE":
            addEmployee();
            break;
        case "REMOVE_DEPARTMENT":
            removeDepartment();
            break;
        case "REMOVE_ROLE":
            removeRole();
            break;
        case "REMOVE_EMPLOYEE":
            removeEmployee();
            break;
        case "UPDATE_EMPLOYEE_ROLE":
            updateRole();
            break;
        case "UPDATE_EMPLOYEE_MANAGER":
            updateManager();
            break;
        default:
            process.exit();
    }
}

// const viewDepartments = () => {
//     connection.query('SELECT department_name FROM department', (err, res) => {
//         (err) ? console.log(err) : console.table(res);
//     });
//     init();
// };
// const viewRoles = () => {
//     connection.query('SELECT title FROM role', (err, res) => {
//         (err) ? console.log(err) : console.table(res);
//     });
//     init();
// };
// const viewEmployees = () => {

//     const query = connection.query(statement, (err, res) => {
//         (err) ? console.log(err) : console.table(res);
//     });
//     init();
// };
// const viewByDepartment = async () => {
//     const res = await queryAsync('SELECT department_name FROM department');

//     const answer = await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select a department: ',
//             choices() {
//                 return [...res].map(({ department_name }) => department_name);
//             },
//             name: 'department_name'
//         }
//     ]);

//     connection.query(`${statement} WHERE ?`,
//         answer,
//         (err, res) => {
//             console.log('\n');
//             (err) ? console.log(err) : console.table(res);
//         });

//     init();
// };

// const viewByManager = async () => {
//     const managerID = await inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a manager ID: ',
//             name: 'manager_id'
//         }
//     ]);

//     connection.query(`${statement} WHERE employee.?`,
//         managerID,
//         (err, res) => {
//             console.log('\n');
//             (err) ? console.log(err) : console.table(res);
//         });

//     init();
// };
// const addDepartment = async () => {
//     const newDepartment = await inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a new department: ',
//             name: 'department_name'
//         }
//     ]);

//     connection.query('INSERT INTO department SET ?',
//         newDepartment,
//         (err, res) => {
//             (err) ? console.log(err) : console.log('\nNew department successfully added.');
//         });
//     init();
// };
// const addRole = async () => {
//     const newRole = await inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a new role: ',
//             name: 'title'
//         },
//         {
//             type: 'input',
//             message: 'Enter a salary: ',
//             name: 'salary'
//         },
//         {
//             type: 'input',
//             message: 'Assign a department ID: ',
//             name: 'department_id'
//         }
//     ]);

//     connection.query('INSERT INTO role SET ?',
//         newRole,
//         (err, res) => {
//             (err) ? console.log(err) : console.log(`\n${newRole.title}New role successfully added.`);
//         });
//     init();
// };
// const addEmployee = async () => {
//     const newEmployee = await inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a first name: ',
//             name: 'first_name'
//         },
//         {
//             type: 'input',
//             message: 'Enter a last name: ',
//             name: 'last_name'
//         },
//         {
//             type: 'input',
//             message: 'Select a role ID: ',
//             name: 'role_id'
//         },
//         {
//             type: 'input',
//             message: 'Select a manager ID: ',
//             name: 'manager_id'
//         },
//     ]);

//     connection.query('INSERT INTO employee SET ?',
//         newEmployee,
//         (err, res) => {
//             (err) ? console.log(err) : console.log('\nNew employee successfully added.');
//         });
//     init();
// };
// const removeDepartment = async () => {
//     const res = await queryAsync('SELECT department_name FROM department');
//     const answer = await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select a department to remove: ',
//             choices() {
//                 return [...res].map(({ department_name }) => department_name);
//             },
//             name: 'department_name'
//         }
//     ]);

//     connection.query(`DELETE FROM department WHERE ?`,
//         answer,
//         (err, res) => {
//             (err) ? console.log(err) : console.log(`\n${answer.department_name} department successfully removed.`);
//         });

//     init();
// };

// const removeRole = async () => {
//     const res = await queryAsync('SELECT title FROM role');
//     const answer = await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select a role to remove: ',
//             choices() {
//                 return [...res].map(({ title }) => title);
//             },
//             name: 'title'
//         }
//     ]);

//     connection.query(`DELETE FROM role WHERE ?`,
//         answer,
//         (err, res) => {
//             (err) ? console.log(err) : console.log(`\n${answer.title} role successfully removed.`);
//         });
//     init();
// };

// const removeEmployee = async () => {
//     const res = await queryAsync('SELECT first_name, last_name FROM employee');
//     const answer = await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select an employee to remove: ',
//             choices() {
//                 return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
//             },
//             name: 'employee'
//         }
//     ]);
//     const first_name = answer.employee.split(' ')[0];
//     const last_name = answer.employee.split(' ')[1];

//     connection.query('DELETE FROM employee WHERE ? AND ?',
//         [
//             { first_name: first_name },
//             { last_name: last_name }
//         ],
//         (err, res) => {
//             (err) ? console.log(err) : console.log(`\n${answer.employee} has been let go.`);
//         });
//     init();
// };

// const updateRole = () => {
//     // const statement = `UPDATE employee SET role_id = 2 WHERE first_name = 'Marcus' AND last_name = 'Fenix'`;

//     connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 message: 'Select an employee to update: ',
//                 choices() {
//                     return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
//                 },
//                 name: 'employee'
//             },
//             {
//                 type: 'input',
//                 message: 'Enter a new role ID: ',
//                 name: 'role_id'
//             }
//         ]).then(({ employee, role_id }) => {
//             connection.query('UPDATE employee SET ? WHERE ? AND ?',
//                 [
//                     { role_id: role_id },
//                     { first_name: employee.split(' ')[0] },
//                     { last_name: employee.split(' ')[1] }
//                 ],
//                 (err, res) => {
//                     (err) ? console.log(err) : console.log(`\n${employee} now has a role ID of ${role_id}.`);
//                 });
//         });
//     });
//     init();
// }

// const updateManager = () => {
//     connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 message: 'Select an employee to update: ',
//                 choices() {
//                     return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
//                 },
//                 name: 'employee'
//             },
//             {
//                 type: 'input',
//                 message: 'Enter a new manager ID: ',
//                 name: 'manager_id'
//             }
//         ]).then(({ employee, manager_id }) => {
//             connection.query('UPDATE employee SET ? WHERE ? AND ?',
//                 [
//                     { manager_id: manager_id },
//                     { first_name: employee.split(' ')[0] },
//                     { last_name: employee.split(' ')[1] }
//                 ],
//                 (err, res) => {
//                     (err) ? console.log(err) : console.log(`\n${employee} now has a new manager ID of ${manager_id}.`);
//                 });
//         });
//     });
//     init();
// }

connection.connect(err => {
    if (err) throw err;
    init();
});