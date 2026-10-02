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

exports.addNewDegreePrograms = async (name,totalEcts) => {
    const result = await pool.query(
        `INSERT INTO degree_programs (name, total_ects) VALUES ($1, $2) RETURNING ${DEGREE_PROGRAMS_COLUMNS}`,
        [name, totalEcts]
    );
    
    return result.rows[0] || null;
}

exports.deleteDegreeProgramm = async (id) => {
   const result = await pool.query(
    `DELETE FROM degree_programs WHERE id = $1 RETURNING ${DEGREE_PROGRAMS_COLUMNS}`,
    [id]
   );

   return result.rows[0] || null;
}

exports.getDegreeProgramById = async (id) => {
    const result = await pool.query(
        `SELECT ${DEGREE_PROGRAMS_COLUMNS} FROM degree_programs WHERE id = $1`,
        [id]
    );

    return result.rows[0] || null;
};
