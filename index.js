const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

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
    {
        name: "View All Employees By Department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    },
    {
        name: "View All Employees By Manager",
        value: "VIEW_EMPLOYEES_BY_MANAGER"
    },
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
        // case "VIEW_DEPARTMENTS":
        //     viewDepartments();
        //     break;
        // case "VIEW_ROLES":
        //     viewRoles();
        //     break;
        // case "VIEW_EMPLOYEES":
        //     viewEmployees();
        //     break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            viewByDeparment();
            break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
            viewByManager();
            break;
        // case "ADD_DEPARTMENT":
        //     addDepartment();
        //     break;
        // case "ADD_ROLE":
        //     addRole();
        //     break;
        // case "ADD_EMPLOYEE":
        //     addEmployee();
        //     break;
        // case "REMOVE_DEPARTMENT":
        //     removeDepartment();
        //     break;
        // case "REMOVE_ROLE":
        //     removeRole();
        //     break;
        // case "REMOVE_EMPLOYEE":
        //     removeEmployee();
        //     break;
        // case "UPDATE_EMPLOYEE_ROLE":
        //     updateRole();
        //     break;
        // case "UPDATE_EMPLOYEE_MANAGER":
        //     updateManager();
        //     break;
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
const viewByDeparment = () => {

    connection.query('SELECT department_name FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select a department: ',
                choices() {
                    return [...res].map(({ department_name }) => department_name);
                },
                name: 'department_name'
            }
        ]).then(answer => {
            connection.query(`${statement} WHERE department_name=?`,
                answer,
                (err, res) => {
                    (err) ? console.log(err) : console.table(res);
                });
        });
    });
    init();
};
const viewByManager = () => {
    connection.query('SELECT DISTINCT manager_id FROM employee', (err, res) => {
        (err) ? console.log(err) : console.table(res);
    });
    init();
};
// const addDepartment = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a department name: ',
//             name: 'department'
//         }
//     ]).then((answer) => {
//         connection.query('INSERT INTO department SET ?',
//             { name: answer.department },
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// };
// const addEmployee = () => {
//     const roles = connection.query('SELECT * FROM role')
//         .map(role => ({ name: role.title, value: role.id }));
//     const managers = connection.query('SELECT * FROM employee')
//         .map(manager => (
//             {
//                 name: `${manager.first_name} ${manager.last_name}`,
//                 value: manager.id
//             }));

//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter a first name: ',
//             name: 'first'
//         },
//         {
//             type: 'input',
//             message: 'Enter a last name: ',
//             name: 'last'
//         },
//         {
//             type: 'list',
//             message: 'Select a role: ',
//             name: 'role',
//             choices: roles
//         },
//         {
//             type: 'list',
//             message: 'Select a manager: ',
//             name: 'manager',
//             choices: managers
//         },
//     ]).then(({ first, last, role, manager }) => {
//         connection.query('INSERT INTO employee SET ?',
//             {
//                 first_name: first,
//                 last_name: last,
//                 role_id: role,
//                 manager_id: manager,
//             },
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// };
// const removeDepartment = () => {
//     const departments = connection.query('SELECT * FROM department');

//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select a department to remove: ',
//             name: 'department',
//             choices: departments
//         }
//     ]).then(answer => {
//         connection.query('DELETE FROM department WHERE department_name=?',
//             { department_name: department },
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// };
// const removeRole = () => {
//     const roles = connection.query('SELECT * FROM role');

//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select a role to remove: ',
//             name: 'role',
//             choices: roles
//         }
//     ]).then(answer => {
//         connection.query('DELETE FROM role WHERE title=?',
//             { title: role },
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// };
// const removeEmployee = () => {
//     const employee = connection.query('SELECT first_name, last_name FROM employee')
//         .map(({ first, last }) => `${first} ${last}`);

//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select an employee to remove: ',
//             name: 'employee',
//             choices: employee
//         }
//     ]).then(answer => {
//         const first = answer.employee.split(' ')[0];
//         const last = answer.employee.split(' ')[1];

//         connection.query('DELETE FROM employee WHERE first_name=? AND last_name=?',
//             [
//                 { first_name: first },
//                 { last_name: last }
//             ],
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// }

// const updateRole = () => {
//     const employee = connection.query('SELECT first_name, last_name FROM employee')
//         .map(({ first, last }) => `${first} ${last}`);
//     const roles = connection.query('SELECT * FROM role')
//         .map(role => ({ name: role.title, value: role.id }));

//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select an employee to update: ',
//             name: 'employee',
//             choices: employee
//         },
//         {
//             type: 'list',
//             message: 'Select a role: ',
//             name: 'role',
//             choices: roles
//         }
//     ]).then(answer => {
//         const first = answer.employee.split(' ')[0];
//         const last = answer.employee.split(' ')[1];

//         connection.query('UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?',
//             [
//                 { role_id: answer.role },
//                 { first_name: first },
//                 { last_name: last }
//             ],
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// }

// const updateManager = () => {
//     const employee = connection.query('SELECT first_name, last_name FROM employee')
//         .map(({ first, last }) => `${first} ${last}`);
//     const managers = connection.query('SELECT * FROM employee')
//         .map(manager => (
//             {
//                 name: `${manager.first_name} ${manager.last_name}`,
//                 value: manager.id
//             }));

//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Select an employee to update: ',
//             name: 'employee',
//             choices: employee
//         },
//         {
//             type: 'list',
//             message: 'Select a role: ',
//             name: 'role',
//             choices: roles
//         }
//     ]).then(answer => {
//         const first = answer.employee.split(' ')[0];
//         const last = answer.employee.split(' ')[1];

//         connection.query('UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?',
//             [
//                 { role_id: answer.role },
//                 { first_name: first },
//                 { last_name: last }
//             ],
//             (err, res) => {
//                 (err) ? console.log(err) : console.table(res);
//             });
//         init();
//     });
// }

connection.connect(err => {
    if (err) throw err;
    init();
});