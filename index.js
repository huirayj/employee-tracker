// importing module dependecies
const inquirer = require('inquirer');
const mysql = require('mysql');
const util = require('util');

const questions = require('./assets/lib/questions');
const statements = require('./assets/lib/sqlStatements');

// establishes connection with the databse
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

// returns responses in a promise object
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
        case "VIEW_SALARY_TOTAL_BY_DEPARTMENT":
            viewSalaryTotal();
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
    // executes a query for department names
    connection.query('SELECT department_name FROM department', (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewRoles = () => {
    // executes a query for roles
    connection.query('SELECT title FROM role', (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewEmployees = () => {
    // executes a query for all employees
    connection.query(statements.all, (err, res) => {
        console.log('\n');
        (err) ? console.log(err) : console.table(res);
    });
    init();
};

const viewByDepartment = async () => {
    // executed query over a department table is converted into an array of objects having name, value, and id properties
    const dptChoices = (await queryAsync('SELECT id, department_name FROM department'))
        .map(({ id, department_name }) =>
            ({ name: department_name, value: { name: department_name, id: id } }));
    // selected department is stored a variable via object destructuring assignemnt
    const { department } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select a department: ',
            choices: dptChoices,
            name: 'department'
        }
    ]);
    // executes a query that filters data by the selected department id
    connection.query(`${statements.all} WHERE department.?`,
        { id: department.id },
        (err, res) => {
            console.log('\n');
            (err) ? console.log(err) : (res.length) ?
                console.table(res) : console.log(`No employees found in ${department.name}`);
        });

    init();
};

const viewByManager = async () => {
    // executed query over a manager table is converted into an array of objects having name, value, and id properties
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

    // executes a query for all employees and filters by manager.id
    connection.query(`${statements.all} WHERE manager.?`,
        { id: manager.id },
        (err, res) => {
            console.log('\n');
            (err) ? console.log(err) : console.table(res);
        });

    init();
};

const viewSalaryTotal = async () => {
    // executed query over a department table is converted into an array of objects having name, value, and id properties
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

    connection.query(`${statements.salaryTotal} WHERE department.?`,
        { id: department.id },
        (err, res) => {
            console.log('\n');
            if (err) {
                console.log(err);
            } else if (res.length) {
                // filtered salary values are extracted via object destructuring and accumulated
                const total = res.map(({ rest, salary }) => salary)
                    .reduce((acc, curr) => acc + curr);

                console.log(`Salary total of ${department.name}: $${total}`);
            } else {
                console.log(`No employees found in ${department.name}`)
            }
        });
    init();
};

const addDepartment = async () => {
    const newDpt = await inquirer.prompt(questions.qnsAddDpt);
    // adds user created item to the db
    connection.query('INSERT INTO department SET ?',
        newDpt,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newDpt.department_name} department was successfully added.`);
        });
    init();
};

const addRole = async () => {
    // executed query over a department table is converted into an array of objects having name, value, and id properties
    const dptChoices = (await queryAsync('SELECT id, department_name FROM department'))
        .map(({ id, department_name }) => ({ name: department_name, value: id }));
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
    // adds user created item to the db
    connection.query('INSERT INTO role SET ?',
        newRole,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newRole.title} role was successfully added.`);
        });
    init();
};

const addEmployee = async () => {
    // executed query over a role table is converted into an array of objects having name and value properties
    const roleChoices = (await queryAsync('SELECT id, title FROM role'))
        .map(({ id, title }) => ({ name: title, value: id }));
    // executed query over a manager table is converted into an array of objects having name and value properties
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
    // adds user created item to the db
    connection.query('INSERT INTO employee SET ?',
        newEmp,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${newEmp.first_name} ${newEmp.last_name} was successfully added.`);
        });
    init();
};

const removeDepartment = async () => {
    // executed query over a department table is converted into an array of objects having name, value, and id properties
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
    // removes user selected item by department.id from the db
    connection.query(`DELETE FROM department WHERE ?`,
        { id: department.id },
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${department.name} department was successfully removed.`);
        });

    init();
};

const removeRole = async () => {
    // executed query over a role table is converted into an array of objects having name, value, and id properties
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
    // removes user selected item by role.id from the db
    connection.query(`DELETE FROM role WHERE ?`,
        removedRole,
        (err, res) => {
            (err) ? console.log(err) :
                console.log(`\n${removedRole.title} role successfully removed.`);
        });
    init();
};

const removeEmployee = async () => {
    // executed query over employee table is converted into an array of objects having name, value, and id properties
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
    // select an employee by their id and removes them
    connection.query('DELETE FROM employee WHERE ?',
        { id: employee.id },
        (err, res) => {
            (err) ? console.log(err) : console.log(`\n${employee.name} has been let go.`);
        });
    init();
};

const updateRole = async () => {
    // executed query over employee table is converted into an array of objects having name, value, and id properties
    const empChoices = (await queryAsync('SELECT id, first_name, last_name FROM employee'))
        .map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: { name: `${first_name} ${last_name}`, id: id }
        }));
    // executed query over a role table is converted into an array of objects having name, value, and id properties
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
    // selects an employee by their id and updates their role
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
    // executed query over employee table is converted into an array of objects having name, value, and id properties
    const empChoices = (await queryAsync('SELECT id, first_name, last_name FROM employee'))
        .map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: { name: `${first_name} ${last_name}`, id: id }
        }));
    const mgrChoices = (await queryAsync(statements.manager))
        .map(({ id, manager }) =>
            ({ name: manager, value: { name: manager, id: id } }));
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
    // selects an employee by their id and updates their manager
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