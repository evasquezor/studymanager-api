const database = require("../data/database.js");
const pool = require("../database/connection") 

const COURSE_COLUMS = `
    id,
    name,
    ects,
    semester,
    degree_program_id,
    type
`;

exports.getAllCourses = async () => {
    const result = await pool.query(
        `SELECT ${COURSE_COLUMS} FROM courses ORDER BY id`
    );

    return result.rows || null;
};

exports.getCourseById = async (id) => {
    const result = await pool.query(
        `SELECT ${COURSE_COLUMS} FROM courses WHERE id = $1`,
        [id]
    );

    return result.rows[0] || null;
};


exports.addCourse = async (name, ects, semester, degreeProgramID, type) => {
    const result = await pool.query(
        `INSERT INTO courses (name, ects, semester, degree_program_id, type) VALUES ($1, $2, $3, $4, $5) RETURNING ${COURSE_COLUMS}`,
        [name, ects, semester, degreeProgramID, type]
    )
    return result.rows[0] || null;
};


exports.updateCourse = async (id, name, ects, semester, degreeProgramID, type) => {
    const result = await pool.query(
        `UPDATE courses
         SET name = $1,
             ects = $2,
             semester = $3,
             degree_program_id = $4,
             type = $5
         WHERE id = $6
         RETURNING ${COURSE_COLUMS}`,
        [name, ects, semester, degreeProgramID, type, id]
    );

    return result.rows[0] || null;
};


exports.deleteCourse = async (id) => {
    const result = await pool.query(
        `DELETE FROM courses WHERE id = $1 RETURNING ${COURSE_COLUMS}`,
        [id]
    );

    return result.rows[0] || null;
};


exports.getCoursesByDegreeProgram = (degreeProgramID, semester) => {

    let courses = database.courses.filter(
        course => course.degreeProgramID === Number(degreeProgramID)
    );

    if (semester !== undefined) {
        courses = courses.filter(
            course => course.semester === Number(semester)
        );
    }

    return courses;
}
