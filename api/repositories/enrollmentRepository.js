const database = require("../data/database.js");

exports.getAllEnrollments = () => {
    return database.enrollments
}
exports.enrollStudent = (studentId, courseId, status) => {

     const newId = database.enrollments.length > 0
            ? Math.max(...database.enrollments.map(enrollment => enrollment.id)) + 1
            : 1;

    const newEnrollment = {
        id: newId,
        studentId: studentId,
        courseId: courseId,
        status: status
    }

    database.enrollments.push(newEnrollment);

    return newEnrollment;
}

exports.getStudentsEnrollments = (studentId) => {
    const enrollments = database.enrollments;
    return enrollments.filter(
        (enrollment) => enrollment.studentId === Number(studentId)
    );

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