const inquirer = require('inquirer');
const mysql = require('mysql');
const util = require('util')

const question = require('./lib/questions')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

const queryAsync = util.promisify(connection.query).bind(connection);

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
    const answer = await inquirer.prompt(question.qnsMenu);
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
};

const viewDepartments = () => {
    connection.query('SELECT department_name FROM department', (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewRoles = () => {
    connection.query('SELECT title FROM role', (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewEmployees = () => {
    const query = connection.query(statement, (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewByDepartment = async () => {
    const res = await queryAsync('SELECT department_name FROM department');
    const selectedDepartment = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a department: ',
            async choices() {
                return [...res].map(({ department_name }) => department_name);
            },
            name: 'department_name'
        }
    ]);

    connection.query(`${statement} WHERE ?`,
        selectedDepartment,
        (err, res) => {
            console.log('\n');
            (err) ? console.log(err) : console.table(res);
        });

    init();
};

const viewByManager = async () => {
    const managerID = await inquirer.prompt(question.qnsViewByMan);

    connection.query(`${statement} WHERE employee.?`,
        managerID,
        (err, res) => {
            console.log('\n');
            (err) ? console.log(err) : console.table(res);
        });

    init();
};

const addDepartment = async () => {
    const newDepartment = await inquirer.prompt(question.qnsAddDep);

    connection.query('INSERT INTO department SET ?',
        newDepartment,
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${newDepartment.department_name} department was successfully added.`);
        });
    init();
};

const addRole = async () => {
    const newRole = await inquirer.prompt(question.qnsAddRole);

    connection.query('INSERT INTO role SET ?',
        newRole,
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${newRole.title} role was successfully added.`);
        });
    init();
};

const addEmployee = async () => {
    const newEmployee = await inquirer.prompt(question.qnsAddEmp);

    connection.query('INSERT INTO employee SET ?',
        newEmployee,
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${newEmployee.first_name} ${newEmployee.last_name} was successfully added.`);
        });
    init();
};

const removeDepartment = async () => {
    const res = await queryAsync('SELECT department_name FROM department');
    const removedDepartment = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a department to remove: ',
            choices() {
                return [...res].map(({ department_name }) => department_name);
            },
            name: 'department_name'
        }
    ]);

    connection.query(`DELETE FROM department WHERE ?`,
        removedDepartment,
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${removedDepartment.department_name} department successfully removed.`);
        });

    init();
};

const removeRole = async () => {
    const res = await queryAsync('SELECT title FROM role');
    const removedRole = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a role to remove: ',
            choices() {
                return [...res].map(({ title }) => title);
            },
            name: 'title'
        }
    ]);

    connection.query(`DELETE FROM role WHERE ?`,
        removedRole,
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${removedRole.title} role successfully removed.`);
        });
    init();
};

const removeEmployee = async () => {
    const res = await queryAsync('SELECT first_name, last_name FROM employee');
    const { employee } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to remove: ',
            choices() {
                return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
            },
            name: 'employee'
        }
    ]);
    const nameArr = employee.split(' ');

    connection.query('DELETE FROM employee WHERE ? AND ?',
        [
            { first_name: nameArr[0] },
            { last_name: nameArr[nameArr.length - 1] }
        ],
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${employee} has been let go.`);
        });
    init();
};

const updateRole = async () => {
    // const statement = `UPDATE employee SET role_id = 2 WHERE first_name = 'Marcus' AND last_name = 'Fenix'`;
    const res = await queryAsync('SELECT first_name, last_name FROM employee');
    const answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update: ',
            choices() {
                return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
            },
            name: 'employee'
        },
        {
            type: 'input',
            message: 'Enter a new role ID: ',
            name: 'role_id'
        }
    ]);

    connection.query('UPDATE employee SET ? WHERE ? AND ?',
        [
            { role_id: answer.role_id },
            { first_name: answer.employee.split(' ')[0] },
            { last_name: answer.employee.split(' ')[answer.length - 1] }
        ],
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${answer.employee} now has a role ID of ${answer.role_id}.`);
        });

    init();
}

const updateManager = async () => {
    const res = await queryAsync('SELECT first_name, last_name FROM employee');
    const answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update: ',
            choices() {
                return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
            },
            name: 'employee'
        },
        {
            type: 'input',
            message: 'Enter a new manager ID: ',
            name: 'manager_id'
        }
    ]);

    connection.query('UPDATE employee SET ? WHERE ? AND ?',
        [
            { manager_id: answer.manager_id },
            { first_name: answer.employee.split(' ')[0] },
            { last_name: answer.employee.split(' ')[1] }
        ],
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${answer.employee} now has a new manager ID of ${answer.manager_id}.`);
        });

    init();
}

connection.connect(err => {
    if (err) throw err;
    init();
});