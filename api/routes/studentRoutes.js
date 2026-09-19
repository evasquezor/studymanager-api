/***
 * REST API methoden
 * GET -> etwas holen
 * POST -> etwas erstellen
 * PUT -> etwas aktualisieren
 * DELETE -> etwas löschen 
 */

const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentController.js");
const { assignStudentToDegreeProgram } = require("../repositories/studentRepository.js");

router.get("/",studentController.getAllStudents);
router.get("/:studentId/ects/completed", studentController.getCompletedEcts);
router.get("/:studentId/ects/remaining", studentController.getRemainingEcts);
router.get("/:studentId/progress", studentController.getStudentProgress);
router.get("/:id",studentController.getStudentById);
router.get("/:id/ects-progress", studentController.getStudentEctsProgress);
router.get("/:id/degree-program",studentController.getStudentDegreeProgramm);
router.post("/",studentController.addStudent);
router.delete("/:id",studentController.deleteStudent)
router.put("/:studentID/degree-program/:degreeProgramID", studentController.assignStudentToDegreeProgram)
module.exports = router;