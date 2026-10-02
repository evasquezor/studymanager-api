const degreeProgramRepository = require("../repositories/degreeProgramRepository");

exports.getAllDegreePrograms =  async (req, res) => {
    try{
        const degreePrograms =  await degreeProgramRepository.findAllDegreePrograms();

        res.json({
            degreePrograms: degreePrograms
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
}

exports.addNewDegreePrograms = async (req, res) => {
    try {
        const name = req.body.name
        const totalEcts = req.body.totalEcts

        if (!name || !totalEcts) {
            return res.status(400).json({
                message: "Name or totalEcts are missing"
            })
        };

        const newDegreeProgram = await degreeProgramRepository.addNewDegreePrograms(name, totalEcts);
        res.json({
            newDegreeProgram: newDegreeProgram
        })
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler"})
    }
}

exports.deleteDegreeProgram = (req, res) => {
    const id = Number(req.params.id)
    const deletedDegreeProgram = degreeProgramRepository.deleteDegreeProgramm(id);
    const degreePrograms = degreeProgramRepository.findAllDegreePrograms();

    res.json({
        DegreePrograms: degreePrograms
    })

}

exports.getDegreeProgramById = (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json({
            message: "id is missing"
        })
    }

    const degreeProgram = degreeProgramRepository.getDegreeProgramById(id);

    if (degreeProgram == null) {
        return res.status(404).json({
            message: "degree program not found"
        });
    }

    return res.json({
        degreeProgram: degreeProgram
    })

}