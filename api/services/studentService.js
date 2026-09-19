const enrollmentRepository = require("../repositories/enrollmentRepository")
const studentRepository = require("../repositories/studentRepository")
const degreeProgramRepository = require("../repositories/degreeProgramRepository")

exports.getStudentCompletedCoursesECTS = (studentId) => {
	const student = studentRepository.findStudentById(Number(studentId));

	if (!student) {
		return null;
	}

	const degreeProgram = degreeProgramRepository.getDegreeProgramById(student.degreeProgramID);

	if (!degreeProgram) {
		return null;
	}

	const completedCourses = enrollmentRepository.getStudentFinishedCourses(student.id);
	const completedEcts = completedCourses.reduce(
		(total, course) => total + Number(course.ects),
		0
	);
	const totalEcts = Number(degreeProgram.totalEcts);
	const remainingEcts = Math.max(totalEcts - completedEcts, 0);
	const progressPercentage = totalEcts > 0
		? Math.min((completedEcts / totalEcts) * 100, 100)
		: 0;

	return {
		completedCourses,
		completedEcts,
		totalEcts,
		remainingEcts,
		progressPercentage
	};
};

exports.getStudentConpletedCoursesECTS = exports.getStudentCompletedCoursesECTS;