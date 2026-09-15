const database = require("../data/database.js");
const enrollmentRepository = require("../repositories/enrollmentRepository")

exports.findAllStudents = () => {
    return database.students;
};

exports.findStudentById = (id) => {
    return database.students.find(student => student.id === id);
};

exports.addStudent = (firstName, lastName) => {
    const newId = database.students.length > 0
        ? Math.max(...database.students.map(student => student.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        firstName: firstName,
        lastName: lastName
    };

    database.students.push(newStudent);

    return newStudent;
};

exports.deleteStudent = (id) => {
    const studentIndex = database.students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return null;
    }

    const deletedStudent = database.students[studentIndex];

    database.students.splice(studentIndex, 1);

    return deletedStudent;
};

exports.getStudentDegreeProgramm = (id) => {
    const student = database.students.find(student => student.id === Number(id));
    const degreeProgramId = student.degreeProgramID;

    if (!student) {
        return null;
    }


    return database.degreePrograms.find(degreeProgramm => degreeProgramm.id === degreeProgramId);
}

exports.assignStudentToDegreeProgram = (studentID, degreeProgramID) => {
    const student = database.students.find(student => student.id === Number(studentID));
    const degreeProgram = database.degreePrograms.find(degreeProgram => degreeProgram.id === Number(degreeProgramID));

    if (!student || !degreeProgram) return null;

    student.degreeProgramID = degreeProgram.id

    return student;
}

