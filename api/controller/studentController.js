const studentRepository = require("../repositories/studentRepository");
const studentService = require("../services/studentService");

exports.getAllStudents = (req, res) => {
    const students = studentRepository.findAllStudents();

    res.json({
        students: students
    });
};

exports.getStudentById = (req, res) => {
    const id = Number(req.params.id);

    const actualStudent = studentRepository.findStudentById(id);

    if (!actualStudent) {
        return res.status(404).json({
            message: "Student with id: " + id + " was not found"
        });
    }

    res.json({
        student: actualStudent
    });
};

exports.getStudentEctsProgress = (req, res) => {
    const studentId = Number(req.params.id);
    const ectsProgress = studentService.getStudentCompletedCoursesECTS(studentId);

    if (!ectsProgress) {
        res.status(404).json({
            message: "Student or degree program was not found"
        });
        return null;
    }

    return res.json(ectsProgress);
};

const getStudentEctsProgress = (req, res) => {
    const studentId = Number(req.params.studentId);
    const ectsProgress = studentService.getStudentCompletedCoursesECTS(studentId);

    if (!ectsProgress) {
        return res.status(404).json({
            message: "Student or degree program was not found"
        });
    }

    return ectsProgress;
};

exports.getCompletedEcts = (req, res) => {
    const ectsProgress = getStudentEctsProgress(req, res);

    if (!ectsProgress) {
        return;
    }

    return res.json({
        completedEcts: ectsProgress.completedEcts
    });
};

exports.getRemainingEcts = (req, res) => {
    const ectsProgress = getStudentEctsProgress(req, res);

    if (!ectsProgress) {
        return;
    }

    return res.json({
        remainingEcts: ectsProgress.remainingEcts
    });
};

exports.getStudentProgress = (req, res) => {
    const ectsProgress = getStudentEctsProgress(req, res);

    if (!ectsProgress) {
        return;
    }

    return res.json({
        progressPercentage: ectsProgress.progressPercentage
    });
};

exports.addStudent = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!firstName || !lastName) {
        return res.status(400).json({
            message: "firstName and lastName are required"
        });
    }

    const newStudent = studentRepository.addStudent(firstName, lastName);

    res.status(201).json({
        message: "Student was created successfully",
        student: newStudent
    });
};

exports.deleteStudent = (req, res) => {
    const id = Number(req.params.id);

    const deletedStudent = studentRepository.deleteStudent(id);

    if (!deletedStudent) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({
        message: deletedStudent.firstName + " " + deletedStudent.lastName + " was removed",
        student: deletedStudent,
        students: studentRepository.findAllStudents()
    });
};

exports.getStudentDegreeProgramm = (req, res) => {
    const studentId = Number(req.params.id)
    const degreeProgram = studentRepository.getStudentDegreeProgramm(studentId)

    res.json({
        degreeProgram
    })
}

exports.assignStudentToDegreeProgram = (req, res) => {
    const studentID = Number(req.params.studentID);
    const degreeProgramID = Number(req.params.degreeProgramID);
    

    if (!studentID) {
        return res.status(404).json({
            message: "Student with " + studentID + "was not found"
        })
    } else if (!degreeProgramID) {
        return res.status(404).json({
            message: "DegreeProgram with " + degreeProgramID + "was not found"
        })
    }

    studentRepository.assignStudentToDegreeProgram(studentID, degreeProgramID);

    const actualStudent = studentRepository.findStudentById(studentID);

    return res.json({
        student: actualStudent
    })
}

