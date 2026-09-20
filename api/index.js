const express = require("express")
const app = express();
const PORT = 3000;
const pool = require("./database/connection");

const studentRoutes = require("./routes/studentRoutes.js")
const courseRoutes = require("./routes/courseRoutes.js")
const degreePrograms = require("./routes/degreeProgramRoutes.js")
const enrollmentRouter = require("./routes/enrollmentRoutes.js")

app.use(express.json())

app.use("/students", studentRoutes)
app.use("/courses", courseRoutes)
app.use("/degreePrograms", degreePrograms)
app.use("/", enrollmentRouter)


app.get("/", (req, res) => {
    res.send("StudyManager API läuft!")
})

app.listen(PORT, () =>{
    console.log(`Server läuft auf http://localhost:${PORT} `)
})

pool.query("SELECT NOW()")
    .then(result => {
        console.log("Database connected:", result.rows[0]);
    })
    .catch(error => {
        console.error("Database connection failed:", error);
    });