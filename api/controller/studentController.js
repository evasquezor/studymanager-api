const studentRepository = require("../repositories/studentRepository");
const studentService = require("../services/studentService");

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentRepository.findAllStudents();

        res.json({
            students: students
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: "Ungültige ID" });
        } 

        const actualStudent = await studentRepository.findStudentById(id);

        if (!actualStudent) {
            return res.status(404).json({ error: "Student nicht gefunden"})
        }

        res.json({
            student: actualStudent
        });
    } catch(err){
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};

exports.addStudent = async (req, res) => {
    try{
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (!firstName || !lastName) {
            return res.status(400).json({
                message: "firstName and lastName are required"
            });
        }

        const newStudent =  await studentRepository.addStudent(firstName, lastName);

        res.status(201).json({
            message: "Student was created successfully",
            student: newStudent
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};

exports.deleteStudent = async (req, res) => {

    try{
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({error: "Ungültige ID"});
        };

        const deletedStudent = await studentRepository.deleteStudent(id);
        
        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: deletedStudent.firtsName + " " + deletedStudent.lastName   + " was removed",
            student: deletedStudent
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};


exports.getStudentDegreeProgramm = async (req, res) => {
    try{
        const studentId = Number(req.params.id);

        if (!Number.isInteger(studentId)) {
            return res.status(400).json({ error: "Ungültige ID"});
        };

        const degreeProgram = await studentRepository.getStudentDegreeProgramm(studentId);

        if (!degreeProgram) {
            return res.status(404).json({
                message: "degree Programm was not found"
            });
        } 

        res.json({
            degreeProgram
        })

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
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






