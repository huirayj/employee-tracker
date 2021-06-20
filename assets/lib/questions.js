// menu choices
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
        name: "View Salary Total by Department",
        value: "VIEW_SALARY_TOTAL_BY_DEPARTMENT"
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

// const qnsViewDpt = [
    // {
    //     type: 'list',
    //     message: 'Select a department: ',
    //     choices: dptChoices,
    //     name: 'department_name'
    // }
// ];

// const qnsViewMgr = [
    // {
    //     type: 'list',
    //     message: 'Select a manager: ',
    //     choices: mgrChoices,
    //     name: 'manager'
    // }
// ];

const qnsAddDpt = [
    {
        type: 'input',
        message: 'Enter a new department: ',
        name: 'department_name'
    }
];

// const qnsAddRole = [
//     {
//         type: 'input',
//         message: 'Enter a new role: ',
//         name: 'title'
//     },
//     {
//         type: 'input',
//         message: 'Enter a salary: ',
//         name: 'salary'
//     },
//     {
//         type: 'list',
//         message: 'Select a department: ',
//         choices: dptChoices,
//         name: 'department_id'
//     }
// ];

// const qnsAddEmp = [
    // {
    //     type: 'input',
    //     message: 'Enter a first name: ',
    //     name: 'first_name'
    // },
    // {
    //     type: 'input',
    //     message: 'Enter a last name: ',
    //     name: 'last_name'
    // },
    // {
    //     type: 'list',
    //     message: 'Select a role: ',
    //     choices: roleChoices,
    //     name: 'role_id'
    // },
    // {
    //     type: 'list',
    //     message: 'Select a manager: ',
    //     choices: mgrChoices,
    //     name: 'manager_id'
    // }
// ];

// const qnsRmDpt = [
    // {
    //     type: 'list',
    //     message: 'Select a department to remove: ',
    //     choices: dptChoices,
    //     name: 'department_name'
    // }
// ];

// const qnsRmRole = [
    // {
    //     type: 'list',
    //     message: 'Select a role to remove: ',
    //     choices: roleChoices,
    //     name: 'title'
    // }
// ];

// const qnsRmEmp = [
    // {
    //     type: 'list',
    //     message: 'Select an employee to remove: ',
    //     choices: empChoices,
    //     name: 'employee'
    // }
// ];

// const qnsUpdRole = [
    // {
    //     type: 'list',
    //     message: 'Select an employee to update: ',
    //     choices: empChoices,
    //     name: 'employee'
    // },
    // {
    //     type: 'list',
    //     message: 'Enter a new role ID: ',
    //     choices: roleChoices,
    //     name: 'role'
    // }
// ];

// const qnsUpdMgr = [
    // {
    //     type: 'list',
    //     message: 'Select an employee to update: ',
    //     choices: empChoices,
    //     name: 'employee'
    // },
    // {
    //     type: 'list',
    //     message: 'Select a manager: ',
    //     choices: mgrChoices,
    //     name: 'manager'
    // }
// ];



module.exports = {
    qnsMenu,
    // qnsViewDpt,
    qnsAddDpt,
    // qnsViewMgr,
    // qnsAddRole,
    // qnsAddEmp,
    // qnsRmDpt,
    // qnsRmRole,
    // qnsRmEmp,
    // qnsUpdRole,
    // qnsUpdMgr
};