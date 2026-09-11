const enrollmentRepository = require("../repositories/enrollmentRepository")
const studentRepository = require("../repositories/studentRepository")
const courseRepository = require ("../repositories/courseRepository")

exports.enrollStudent = (req, res) => {
    
    const studentId = Number(req.params.studentId);
    const courseId = Number(req.params.courseId)

    const student = studentRepository.findStudentById(studentId)

    if (!student) {
        return res.status(404).json({
            message: "Student with id " + studentId + "was not found"
        });
    }

    const course = courseRepository.getCourseById(courseId)

    if(!course) {
        return res.status(404).json({
            message: "Course with id " + courseId + " was not found"
        });
    }

    const enrollment = enrollmentRepository.enrollStudent(
        studentId,
        courseId,
        "ENROLLED"
    );

    return res.status(201).json({
        message: "Student successfully enrolled",
        enrollment
    });

}

exports.getStudentEnrollments = (req, res) => {
    const studentId = Number(req.params.studentId)

    const student = studentRepository.findStudentById(studentId)

    if (!student) {
        return res.status(404).json({
            message: "Student with id " + studentId + "was not found"
        });
    }

    const studentEnrollments = enrollmentRepository.getStudentsEnrollments(studentId)

    return res.json({
        enrollments: studentEnrollments
    })
}

exports.getStudentFinishedCourses = (req, res) => {
    const studentId = Number(req.params.studentId)

    const student = studentRepository.findStudentById(studentId)

    if (!student) {
        return res.status(404).json({
            message: "Student with id " + studentId + "was not found"
        });
    }

    const StudentFinishedEnrollments = enrollmentRepository.getStudentFinishedCourses(studentId);

    if (StudentFinishedEnrollments.length === 0) {
        return res.status(404).json({
            message: "Student with id " + studentId + " has no completed courses"
        })
    }

    return res.json({
        finishesCourses : StudentFinishedEnrollments
    })
}

exports.changeEnrollmentStatus = (req, res) => {
    const studentId = Number(req.params.studentId);
    const courseId = Number(req.params.courseId);
    const status = req.body.status;
    const allowedStatuses = ["PLANNED", "ENROLLED", "IN_PROGRESS", "FINISHED"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "status must be one of: " + allowedStatuses.join(", ")
        });
    }

    const enrollment = enrollmentRepository.changeEnrollmentStatus(
        studentId,
        courseId,
        status
    );

    if (!enrollment) {
        return res.status(404).json({
            message: "Enrollment for student " + studentId + " and course " + courseId + " was not found"
        });
    }

    return res.json({
        message: "Enrollment status was changed successfully",
        enrollment
    });
}