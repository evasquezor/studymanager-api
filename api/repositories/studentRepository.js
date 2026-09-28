// const database = require("../data/database.js");
const pool = require("../database/connection") 
const enrollmentRepository = require("../repositories/enrollmentRepository")

const STUDENT_COLUMNS = `
    id,
    first_name AS "firtsName",
    last_name AS "lastName",
    degree_program_id AS "degreeProgramID"
`;

exports.findAllStudents = async () => {
    const result = await pool.query(
        `SELECT ${STUDENT_COLUMNS} FROM students ORDER BY id`
    );

    return result.rows;
};

exports.findStudentById = async (id) => {
    const result = await pool.query(
        `SELECT ${STUDENT_COLUMNS} FROM students WHERE id = $1`,
        [id]
    );
    return result.rows[0] || null;
};

exports.addStudent =  async (firstName, lastName) => {
    const result = await pool.query(
        `INSERT INTO students (first_name, last_name) VALUES ($1, $2) RETURNING ${STUDENT_COLUMNS}`,
        [firstName, lastName]
    );

    return result.rows[0] || null;
};

exports.deleteStudent = (id) => {
    const studentIndex = database.students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return null;
    }

    const deletedStudent = database.students[studentIndex];

    database.students.splice(studentIndex, 1);

    return deletedStudent;
};

exports.getStudentDegreeProgramm = (id) => {
    const student = database.students.find(student => student.id === Number(id));
    const degreeProgramId = student.degreeProgramID;

    if (!student) {
        return null;
    }


    return database.degreePrograms.find(degreeProgramm => degreeProgramm.id === degreeProgramId);
}

exports.assignStudentToDegreeProgram = (studentID, degreeProgramID) => {
    const student = database.students.find(student => student.id === Number(studentID));
    const degreeProgram = database.degreePrograms.find(degreeProgram => degreeProgram.id === Number(degreeProgramID));

    if (!student || !degreeProgram) return null;

    student.degreeProgramID = degreeProgram.id

    return student;
}

