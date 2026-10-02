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

exports.deleteDegreeProgram = async (req, res) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id)) {
            res.status(404).json({ message: "Ungültige ID"});
        };
        const deletedDegreeProgram = await degreeProgramRepository.deleteDegreeProgramm(id);
        res.json({
            DegreePrograms: deletedDegreeProgram
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Datenbankfehler"});
    }
}


exports.getDegreeProgramById = async (req, res) => {

    try{
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Wrong id"
            });
        };

        const degreeProgram = await degreeProgramRepository.getDegreeProgramById(id);

        if (degreeProgram == null) {
            return res.status(404).json({
                message: "degree program not found"
            });
        }

        return res.json({
            degreeProgram: degreeProgram
        });

    } catch (err){
        console.error(err);
        res.status(500).json({error: "Datenbankfehler"});

    }
    

}