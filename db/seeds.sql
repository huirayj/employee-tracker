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
   ("CEO", 1400000, null),
   ("Researcher", 70000, 1),
   ("Engineer", 75000, 2),
   ("Accountant", 80000,3),
   ("Sales Manager", 70000, 4),
   ("Representative", 40000, 5);

INSERT INTO employees 
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Marcus", "Fenix", 4, 1),
    ("Johnny", "Cage", 5, 4),
    ("Samuel", "Oak", 2, 1),
    ("Carmen", "Sandiego", 5, 3),
    ("Nathan", "Drake", 6, 5),
    ("Jill", "Valentine", 6, 5),
    ("Niko", "Bellic", 6, 5),
    ("Gordon", "Freeman", 3, 2),
    ("Arthas", "Menethil", 1, null);
