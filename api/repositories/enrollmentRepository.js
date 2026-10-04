const pool = require("../database/connection");

const ENROLLMENTS_COLUMNS = `
    id,
    student_id,
    course_id,
    status,
    grade
`;

exports.getAllEnrollments = async () => {
    const result = await pool.query(
        `SELECT ${ENROLLMENTS_COLUMNS} FROM enrollments ORDER BY id`
    )
    return result.rows || null;
}

exports.enrollStudent = async (studentId, courseId) => {
    const result = await pool.query(
        `INSERT INTO enrollments (student_id, course_id)
         VALUES ($1, $2)
         RETURNING ${ENROLLMENTS_COLUMNS}`,
        [studentId, courseId]
    );

    return result.rows[0] || null;
};

exports.getStudentsEnrollments = async (studentId) => {
    const result = await pool.query(
        `SELECT ${ENROLLMENTS_COLUMNS} FROM enrollments WHERE student_id = $1`,
        [studentId]
    );
    return result.rows || null;
}

exports.getStudentFinishedCourses = (studentId) => {

    const enrollments = database.enrollments;
    const courses = database.courses;

    const studentEnrollments = enrollments.filter(
        (enrollment) => enrollment.studentId == studentId
    )

    const StudentFinishedEnrollments = studentEnrollments.filter(
        (enrollment) => enrollment.status == "FINISHED"
    )

     const studentCoursesId = StudentFinishedEnrollments.map(
        (enrollment) => enrollment.courseId
    );

    const studentCourses = courses.filter((course) =>
        studentCoursesId.includes(course.id)
    );

    return studentCourses
}

exports.changeEnrollmentStatus = async (enrollmentId, status) => {
    const result = await pool.query(
        `UPDATE enrollments
         SET status = $1
         WHERE id = $2
         RETURNING ${ENROLLMENTS_COLUMNS}`,
        [status, enrollmentId]
    );

    return result.rows[0] || null;
};

exports.deleteEnrollment = async (enrollmentId) => {
    const result = await pool.query(
        `DELETE FROM enrollments WHERE id = $1  RETURNING ${ENROLLMENTS_COLUMNS}`,
        [enrollmentId]
    );

    return result.rows[0] || null;
}

exports.setGrade = async (enrollmentId, grade) => {
    const result = await pool.query(
        `UPDATE enrollments SET grade = $1 WHERE id = $2 RETURNING ${ENROLLMENTS_COLUMNS}`,
        [grade, enrollmentId]
    );

    return result.rows[0] || null;
}