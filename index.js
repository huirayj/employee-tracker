const inquirer = require('inquirer');
const mysql = require('mysql');
const util = require('util');

const questions = require('./lib/questions');
const statements = require('./lib/sqlStatements');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

const queryAsync = util.promisify(connection.query).bind(connection);

const init = async () => {
    const answer = await inquirer.prompt(questions.qnsMenu);

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
    connection.query(statements.all, (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewByDepartment = async () => {
    const dptChoices = (await queryAsync('SELECT id, department_name FROM department'))
        .map(({ id, department_name }) =>
            ({ name: department_name, value: { name: department_name, id: id } }));
    const { department } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a department: ',
            choices: dptChoices,
            name: 'department'
        }
    ]);

    connection.query(`${statements.all} WHERE department.?`,
        { id: department.id },
        (err, res) => {
            console.log('\n');
            // console.log(res.length);
            (err) ? console.log(err) : (res.length) ?
                console.table(res) : console.log(`No employees found in ${department.name}`);
        });

    init();
};

const viewByManager = async () => {
    const mgrChoices = (await queryAsync(statements.manager))
        .map(({ id, manager }) =>
            ({ name: manager, value: { name: manager, id: id } }));
    const { manager } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a manager: ',
            choices: mgrChoices,
            name: 'manager'
        }
    ]);

    console.log(manager);

    connection.query(`${statements.all} WHERE manager.?`,
        { id: manager.id },
        (err, res) => {
            console.log('\n');
            (err) ? console.log(err) : console.table(res);
        });

    init();
};

const addDepartment = async () => {
    const newDpt = await inquirer.prompt(questions.qnsAddDpt);

    connection.query('INSERT INTO department SET ?',
        newDpt,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newDpt.department_name} department was successfully added.`);
        });
    init();
};

const addRole = async () => {
    const dptChoices = (await queryAsync('SELECT id, department_name FROM department'))
        .map(({ id, department_name }) =>
            ({ name: department_name, value: id }));
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            message: 'Enter a new role: ',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter a salary: ',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Select a department: ',
            choices: dptChoices,
            name: 'department_id'
        }
    ]);

    connection.query('INSERT INTO role SET ?',
        newRole,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newRole.title} role was successfully added.`);
        });
    init();
};

const addEmployee = async () => {
    const roleChoices = (await queryAsync('SELECT id, title FROM role'))
        .map(({ id, title }) => ({ name: title, value: id }));
    const mgrChoices = (await queryAsync(statements.manager))
        .map(({ id, manager }) => ({ name: manager, value: id }));
    const newEmp = await inquirer.prompt([
        {
            type: 'input',
            message: 'Enter a first name: ',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'Enter a last name: ',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'Select a role: ',
            choices: roleChoices,
            name: 'role_id'
        },
        {
            type: 'list',
            message: 'Select a manager: ',
            choices: mgrChoices,
            name: 'manager_id'
        }
    ]);

    connection.query('INSERT INTO employee SET ?',
        newEmp,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newEmp.first_name} ${newEmp.last_name} was successfully added.`);
        });
    init();
};

const removeDepartment = async () => {
    const dptChoices = (await queryAsync('SELECT id, department_name FROM department'))
        .map(({ id, department_name }) =>
            ({ name: department_name, value: { name: department_name, id: id } }));
    const { department } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a department to remove: ',
            choices: dptChoices,
            name: 'department'
        }
    ]);

    connection.query(`DELETE FROM department WHERE ?`,
        { id: department.id },
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${department.name} department was successfully removed.`);
        });

    init();
};

const removeRole = async () => {
    const roleChoices = (await queryAsync('SELECT title FROM role'))
        .map(({ title }) => title);
    const removedRole = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a role to remove: ',
            choices: roleChoices,
            name: 'title'
        }
    ]);

    connection.query(`DELETE FROM role WHERE ?`,
        removedRole,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${removedRole.title} role successfully removed.`);
        });
    init();
};

const removeEmployee = async () => {
    const empChoices = (await queryAsync('SELECT id, first_name, last_name FROM employee'))
        .map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: { name: `${first_name} ${last_name}`, id: id }
        }));
    const { employee } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to remove: ',
            choices: empChoices,
            name: 'employee'
        }
    ]);

    connection.query('DELETE FROM employee WHERE ?',
        { id: employee.id },
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${employee.name} has been let go.`);
        });
    init();
};

const updateRole = async () => {
    const empChoices = (await queryAsync('SELECT id, first_name, last_name FROM employee'))
        .map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: { name: `${first_name} ${last_name}`, id: id }
        }));
    const roleChoices = (await queryAsync('SELECT id, title FROM role'))
        .map(({ id, title }) => ({ name: title, value: { name: title, id: id } }));
    const { employee, role } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update: ',
            choices: empChoices,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Enter a new role ID: ',
            choices: roleChoices,
            name: 'role'
        }
    ]);

    connection.query('UPDATE employee SET ? WHERE ?',
        [
            { role_id: role.id },
            { id: employee.id }
        ],
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${employee.name} now has the role of ${role.name}.`);
        });

    init();
};

const updateManager = async () => {
    const empChoices = (await queryAsync('SELECT id, first_name, last_name FROM employee'))
        .map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: { name: `${first_name} ${last_name}`, id: id }
        }));
    const mgrChoices = (await queryAsync(statements.manager))
        .map(({ id, manager }) =>
        ({
            name: manager,
            value: { name: manager, id: id }
        }));
    const { employee, manager } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update: ',
            choices: empChoices,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'Select a manager: ',
            choices: mgrChoices,
            name: 'manager'
        }
    ]);

    connection.query('UPDATE employee SET ? WHERE ?',
        [
            { manager_id: manager.id },
            { id: employee.id }
        ],
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${employee.name} now has a new manager of ${manager.name}.`);
        });

    init();
};

connection.connect(err => {
    if (err) throw err;
    init();
});