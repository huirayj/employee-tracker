const choices = [
    {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS"
    },
    {
        name: "View All Roles",
        value: "VIEW_ROLES"
    },
    {
        name: "View All Employees",
        value: "VIEW_EMPLOYEES"
    },
    {
        name: "View All Employees By Department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    },
    {
        name: "View All Employees By Manager",
        value: "VIEW_EMPLOYEES_BY_MANAGER"
    },
    {
        name: "Add Department",
        value: "ADD_DEPARTMENT"
    },
    {
        name: "Add Role",
        value: "ADD_ROLE"
    },
    {
        name: "Add Employee",
        value: "ADD_EMPLOYEE"
    },
    {
        name: "Remove Department",
        value: "REMOVE_DEPARTMENT"
    },
    {
        name: "Remove Role",
        value: "REMOVE_ROLE"
    },
    {
        name: "Remove Employee",
        value: "REMOVE_EMPLOYEE"
    },
    {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
    },
    {
        name: "Update Employee Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
    },
    {
        name: "Quit",
        value: "QUIT"
    }
];

const qnsMenu = [
    {
        type: 'list',
        message: 'What would you like to do? ',
        name: 'choice',
        choices: choices
    }
];

// const qnsViewByDep = [
//     {
//         type: 'list',
//         message: 'Select a department: ',
//         async choices() {
//             return [...res].map(({ department_name }) => department_name);
//         },
//         name: 'department_name'
//     }
// ];

// const qnsViewByMan = [
//     {
//         type: 'list',
//         message: 'Select a manager: ',
//         choices() {
//             return [...managerChoices].map(({ id, manager }) => `${id} ${manager}`);
//         },
//         name: 'manager'
//     }
// ];

const qnsAddDep = [
    {
        type: 'input',
        message: 'Enter a new department: ',
        name: 'department_name'
    }
];

const qnsAddRole = [
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
        type: 'input',
        message: 'Assign a department ID: ',
        name: 'department_id'
    }
];

// const qnsAddEmp = [
//     {
//         type: 'input',
//         message: 'Enter a first name: ',
//         name: 'first_name'
//     },
//     {
//         type: 'input',
//         message: 'Enter a last name: ',
//         name: 'last_name'
//     },
//     {
//         type: 'input',
//         message: 'Select a role ID: ',
//         name: 'role_id'
//     },
//     {
//         type: 'input',
//         message: 'Select a manager ID: ',
//         name: 'manager_id'
//     },
// ];

// const qnsRmDep = [
//     {
//         type: 'list',
//         message: 'Select a department to remove: ',
//         choices() {
//             return [...res].map(({ department_name }) => department_name);
//         },
//         name: 'department_name'
//     }
// ];

// const qnsRmRole = [
//     {
//         type: 'list',
//         message: 'Select a role to remove: ',
//         choices() {
//             return [...res].map(({ title }) => title);
//         },
//         name: 'title'
//     }
// ];

// const qnsRmEmp = [
//     {
//         type: 'list',
//         message: 'Select an employee to remove: ',
//         choices() {
//             return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
//         },
//         name: 'employee'
//     }
// ];

// const qnsUpdRole = [
//     {
//         type: 'list',
//         message: 'Select an employee to update: ',
//         choices: employeeChoices,
//         name: 'employee'
//     },
//     {
//         type: 'list',
//         message: 'Enter a new role ID: ',
//         choices: roleChoices,
//         name: 'role_id'
//     }
// ];

// const qnsUpdMan = [
//     {
//         type: 'list',
//         message: 'Select an employee to update: ',
//         choices() {
//             return [...res].map(({ first_name, last_name }) => `${first_name} ${last_name}`);
//         },
//         name: 'employee'
//     },
//     {
//         type: 'input',
//         message: 'Enter a new manager ID: ',
//         name: 'manager_id'
//     }
// ];

module.exports = {
    qnsMenu,
    // qnsViewByDep,
    qnsAddDep,
    // qnsViewByMan,
    qnsAddRole,
    // qnsAddEmp,
    // qnsRmDep,
    // qnsRmRole,
    // qnsRmEmp,
    // qnsUpdRole,
    // qnsUpdMan
};