const pool = require("../database/connection");
const  DEGREE_PROGRAMS_COLUMNS = `
    id,
    name,
    total_ects
`;

exports.findAllDegreePrograms = async () => {
    const result = await pool.query(
        `SELECT ${DEGREE_PROGRAMS_COLUMNS} FROM degree_programs ORDER BY id`
    );
    
    return result.rows || null;
}

exports.addNewDegreePrograms = (name,totalEcts) => {
    const newId = database.students.length > 0
            ? Math.max(...database.students.map(student => student.id)) + 1
            : 1;

    const newDegreeProgram = {
        id: newId,
        name: name,
        totalEcts: totalEcts
    };

    database.degreePrograms.push(newDegreeProgram)

    return newDegreeProgram;
}

exports.deleteDegreeProgramm = (id) => {
    const degreeProgramIndex = database.degreePrograms.findIndex(degreeProgram => degreeProgram.id === id);

    if(degreeProgramIndex === -1) {
        return null
    }

    const deletedDegreeProgram = database.degreePrograms[degreeProgramIndex];

    database.degreePrograms.splice(degreeProgramIndex, 1);

    return deletedDegreeProgram
}

exports.getDegreeProgramById = (id) => {
    const degreeProgram = database.degreePrograms.find(degreeProgram => degreeProgram.id === Number(id));

    if (degreeProgram == null) return null;

    return degreeProgram;
}
