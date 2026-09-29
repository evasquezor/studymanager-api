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

exports.deleteStudent = async (id) => {
    const result = await pool.query(
        `DELETE FROM students WHERE id = $1 RETURNING ${STUDENT_COLUMNS}`,
        [id]
    );

    return result.rows[0] || null;
};

exports.getStudentDegreeProgramm = async (id) => {
    const result = await pool.query(
        `SELECT degree_programs.name FROM degree_programs JOIN students ON degree_programs.id = students.degree_program_id WHERE students.id = $1`,
        [id]
    )

    return result.rows[0] || null;
}

exports.assignStudentToDegreeProgram = async (studentID, degreeProgramID) => {
    try{
        const result = await pool.query(
        `UPDATE students SET degree_program_id = $1 WHERE id = $2 RETURNING ${STUDENT_COLUMNS}`,
        [degreeProgramID, studentID ]
        );

        return result.rows[0] || null;
    } catch (err) {
        if (err.code === "23503") {
            const error = new Error("Degree program does not exist");
            error.code = "FK_VIOLATION";
            throw error;
        }
        throw err;
    }
}

