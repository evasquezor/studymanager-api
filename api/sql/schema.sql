CREATE TABLE enrollments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    grade DECIMAL(3,2),

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
);

CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    degree_program_id INTEGER NOT NULL,

    CONSTRAINT fk_student_degree_program
        FOREIGN KEY (degree_program_id)
        REFERENCES degree_programs(id)
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ects INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    degree_program_id INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL,

    CONSTRAINT fk_course_degree_program
        FOREIGN KEY (degree_program_id)
        REFERENCES degree_programs(id)
);

CREATE TABLE enrollments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    grade DECIMAL(3,2),

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
);