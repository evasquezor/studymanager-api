const courseRepository = require("../repositories/courseRepository");


exports.getAllCourses = async (req, res) => {
    try {
        const courses =  await courseRepository.getAllCourses();
        res.json({
        courses: courses
    });
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};


exports.getCourseById = async (req, res) => {
    try{
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid course id"
            });
        };
        const course =  await courseRepository.getCourseById(id);
        if (!course) {
            res.status(400).json({ error: "Course with id: " + id + " does not exist"})
        }
        res.json({
            course: course
        });
     } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    };
};

exports.addCourse = async (req, res) => {
    try {
        const {
            name,
            ects,
            semester,
            degreeProgramID,
            type
        } = req.body;

        if (!name || ects === undefined || semester === undefined || !degreeProgramID || !type) {
            return res.status(400).json({
                message: "name, ects, semester, degreeProgramID and type are required"
            });
        }

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                message: "name must be a non-empty string"
            });
        }

        if (typeof ects !== "number" || ects <= 0) {
            return res.status(400).json({
                message: "ects must be a positive number"
            });
        }

        if (!Number.isInteger(semester) || semester <= 0) {
            return res.status(400).json({
                message: "semester must be a positive integer"
            });
        }

        if (!Number.isInteger(degreeProgramID) || degreeProgramID <= 0) {
            return res.status(400).json({
                message: "degreeProgramID must be a positive integer"
            });
        }

        const validTypes = ["MANDATORY", "ELECTIVE", "VOLUNTARY"];

        if (!validTypes.includes(type)) {
            return res.status(400).json({
                message: "type must be MANDATORY, ELECTIVE or VOLUNTARY"
            });
        }

        const newCourse = await courseRepository.addCourse(
            name,
            ects,
            semester,
            degreeProgramID,
            type
        );

        res.status(201).json({
            message: "Course was created successfully",
            course: newCourse
        });

    } catch (err) {
        if (err.code === "23503") {
            return res.status(404).json({ message: "degreeProgramID does not exist" });
        }
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
};


exports.updateCourse = (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid course id"
        });
    }

    const {
        name,
        ects,
        semester,
        degreeProgramID,
        type
    } = req.body;


    if (!name || ects === undefined || semester === undefined || !degreeProgramID || !type) {
        return res.status(400).json({
            message: "name, ects, semester, degreeProgramID and type are required"
        });
    }


    const validTypes = [
        "MANDATORY",
        "ELECTIVE",
        "VOLUNTARY"
    ];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            message: "type must be MANDATORY, ELECTIVE or VOLUNTARY"
        });
    }


    const updatedCourse = courseRepository.updateCourse(
        id,
        name,
        ects,
        semester,
        degreeProgramID,
        type
    );


    if (!updatedCourse) {
        return res.status(404).json({
            message: "Course with id " + id + " was not found"
        });
    }


    res.json({
        message: "Course was updated successfully",
        course: updatedCourse
    });
};


exports.deleteCourse = (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid course id"
        });
    }

    const deletedCourse = courseRepository.deleteCourse(id);

    if (!deletedCourse) {
        return res.status(404).json({
            message: "Course with id " + id + " was not found"
        });
    }

    res.json({
        message: "Course was deleted successfully",
        course: deletedCourse
    });
};


exports.getCoursesByDegreeProgram = (req, res) => {

    const degreeProgramID = Number(req.params.degreeProgramID);
    const semester = req.query.semester;

    if (!Number.isInteger(degreeProgramID)) {
        return res.status(400).json({
            message: "Invalid degree program id"
        });
    }

    if (semester !== undefined && !Number.isInteger(Number(semester))) {
        return res.status(400).json({
            message: "Invalid semester"
        });
    }

    const courses = courseRepository.getCoursesByDegreeProgram(
        degreeProgramID,
        semester
    );

    res.json({
        courses: courses
    });
};