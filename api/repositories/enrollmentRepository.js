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

exports.changeEnrollmentStatus = (studentId, courseId, status) => {
    const enrollment = database.enrollments.find(
        (enrollment) => enrollment.studentId === studentId && enrollment.courseId === courseId
    );

    if (!enrollment) {
        return null;
    }

    enrollment.status = status;
 
    return enrollment;
}

exports.deleteEnrollment = (enrollmentId) => {
    const enrollmentIndex = database.enrollments.findIndex(enrollment => enrollment.id === enrollmentId);
    
        if (enrollmentIndex === -1) {
            return null;
        }
    
        const deletedEnrollment = database.enrollments[enrollmentIndex];
    
        database.enrollments.splice(enrollmentIndex, 1);
    
        return deletedEnrollment;
}

exports.setGrade = (enrollmentId, grade) => {
    const enrollment = database.enrollments.find((enrollment) => enrollment.id === enrollmentId);

    if (!enrollment) {
        return null
    }

    enrollment.grade = grade;

    return enrollment;
}