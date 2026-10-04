const enrollmentRepository = require("../repositories/enrollmentRepository")
const studentRepository = require("../repositories/studentRepository")
const courseRepository = require ("../repositories/courseRepository")

exports.getAllEnrollments = async (req,res) => {
    try{
    const enrollments = await enrollmentRepository.getAllEnrollments();

    res.json({
        enrollments: enrollments
    });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler"});
    };
};

exports.enrollStudent = async (req, res) => {
    try {
        const studentId = Number(req.params.studentId);
        const courseId = Number(req.params.courseId);

        const student = await studentRepository.findStudentById(studentId);
        if (!student) {
            return res.status(404).json({
                message: "Student with id " + studentId + " was not found"
            });
        }

        const course = await courseRepository.getCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course with id " + courseId + " was not found"
            });
        }

        const enrollment = await enrollmentRepository.enrollStudent(
            studentId,
            courseId
        );

        return res.status(201).json({
            message: "Student successfully enrolled",
            enrollment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getStudentEnrollments = async (req, res) => {
    try{
        const studentId = Number(req.params.studentId);
        const student = studentRepository.findStudentById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student with id " + studentId + "was not found"
            });
        };

        const studentEnrollments =  await enrollmentRepository.getStudentsEnrollments(studentId);

        return res.json({
            enrollments: studentEnrollments
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    };
};

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

exports.changeEnrollmentStatus = async (req, res) => {
    try {
        const enrollmentId = Number(req.params.enrollmentId);
        const status = req.body.status;
        const allowedStatuses = ["PLANNED", "ENROLLED", "IN_PROGRESS", "FINISHED"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "status must be one of: " + allowedStatuses.join(", ")
            });
        }

        const enrollment = await enrollmentRepository.changeEnrollmentStatus(
            enrollmentId,
            status
        );

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment with id " + enrollmentId + " was not found"
            });
        }

        return res.json({
            message: "Enrollment status was changed successfully",
            enrollment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteEnrollment = async (req, res) => {

    try {
        const enrollmentId = Number(req.params.enrollmentId);

        if (!Number.isInteger(enrollmentId)) {
            return res.status(400).json({ message: "Ungültige ID"});
        };

        const deleteEnrollment = await enrollmentRepository.deleteEnrollment(enrollmentId);

        if (!deleteEnrollment) {
            return res.status(404).json({
                message : "Enrollment was not found"
            });
        };

        res.json({
            message: "Enrollment with id: " + deleteEnrollment.id + " was deleted",
            enrollment: deleteEnrollment,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

exports.setGrade = (req, res) => {
    const enrollmentId = Number(req.params.enrollmentId);
    const grade = Number(req.body.grade);

    const enrollment = enrollmentRepository.setGrade(enrollmentId, grade);

    if (!enrollment) {
       return res.status(404).json({ // Code 404 für Was not found
            message: "Enrollment with id: " +  enrollmentId + " was not found"
        })
    }

    if (enrollment.status !== "FINISHED") {
        return res.status(400).json({ // Code 400 für Bad request
            message: "Enrollment with id: " + enrollmentId + " has not been Finished"
        })
    }

    res.status(202).json({
        enrollment: enrollment
    });
}