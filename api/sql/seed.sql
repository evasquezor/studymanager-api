INSERT INTO degree_programs (id, name, total_ects)
VALUES
(1, 'Informatik Bachelor', 180),
(2, 'Wirtschaftsinformatik Bachelor', 180),
(3, 'Data Science Master', 120);

INSERT INTO students (id, first_name, last_name, degree_program_id)
VALUES
(1, 'John', 'Smith', 1),
(2, 'Emma', 'Johnson', 1),
(3, 'Michael', 'Brown', 1),
(4, 'Olivia', 'Davis', 2),
(5, 'Erik', 'Vasquez', 2);

INSERT INTO courses
(id, name, ects, semester, degree_program_id, type)
VALUES
(1, 'JavaScript Grundlagen', 5, 1, 1, 'MANDATORY'),
(2, 'Datenbanken', 5, 2, 1, 'MANDATORY'),
(3, 'Algorithmen und Datenstrukturen', 6, 2, 1, 'MANDATORY'),
(4, 'Webentwicklung', 5, 3, 1, 'ELECTIVE'),
(5, 'Software Engineering', 6, 3, 1, 'MANDATORY'),
(6, 'Betriebssysteme', 5, 3, 1, 'MANDATORY'),
(7, 'Computernetzwerke', 5, 4, 1, 'MANDATORY'),
(8, 'Künstliche Intelligenz', 6, 5, 1, 'ELECTIVE'),
(9, 'IT-Sicherheit', 5, 5, 1, 'ELECTIVE'),
(10, 'Mobile App Entwicklung', 5, 6, 1, 'VOLUNTARY'),
(11, 'Wirtschaftsinformatik Grundlagen', 5, 1, 2, 'MANDATORY'),
(12, 'Betriebswirtschaftslehre', 5, 1, 2, 'MANDATORY'),
(13, 'Informationssysteme', 6, 2, 2, 'MANDATORY'),
(14, 'Machine Learning', 6, 1, 3, 'MANDATORY'),
(15, 'Data Mining', 6, 2, 3, 'MANDATORY');

INSERT INTO enrollments
(id, student_id, course_id, status, grade)
VALUES
(1, 1, 1, 'FINISHED', NULL),
(2, 1, 2, 'PLANNED', NULL),
(3, 1, 3, 'PLANNED', NULL),
(4, 2, 1, 'PLANNED', NULL),
(5, 3, 1, 'PLANNED', NULL);