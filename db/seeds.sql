INSERT INTO department 
    (department_name)
VALUES 
    ('R & D'),
    ('Manufacturering'),
    ('Finance'),
    ('Marketing'),
    ('Customer Service');

INSERT INTO role 
    (title, salary, department_id)
VALUES 
   ("Researcher", 70000, 1),
   ("Engineer", 75000, 2),
   ("Accountant", 80000, 3),
   ("Sales Manager", 70000, 4),
   ("Representative", 40000, 5)

INSERT INTO employees 
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Marcus", "Fenix", 3, null),
    ("Johnny", "Cage", 4, 3),
    ("Samuel", "Oak", 1, 1),
    ("Carmen", "Sandiego", 4, 2)