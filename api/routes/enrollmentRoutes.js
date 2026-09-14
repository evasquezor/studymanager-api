const express = require("express");

const enrollmentController = require("../controller/enrollmentController");

const router = express.Router();


router.post(
    "/students/:studentId/courses/:courseId/enroll",
    enrollmentController.enrollStudent
);

router.get("/students/:studentId/enrollments", enrollmentController.getStudentEnrollments);

router.get("/students/:studentId/enrollments/finished", enrollmentController.getStudentFinishedCourses)

router.patch(
    "/students/:studentId/courses/:courseId/enrollment/status",
    enrollmentController.changeEnrollmentStatus
)

router.delete("/enrollment/:enrollmentId/delete", enrollmentController.deleteEnrollment)

router.get("/enrollments", enrollmentController.getAllEnrollments)

router.patch("/enrollment/:enrollmentId/grade", enrollmentController.setGrade)


module.exports = router;

