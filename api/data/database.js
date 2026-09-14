let students = [
    { firstName: "John", lastName: "Smith", id: 1, degreeProgramID: 1 },
    { firstName: "Emma", lastName: "Johnson", id: 2, degreeProgramID: 1 },
    { firstName: "Michael", lastName: "Brown", id: 3, degreeProgramID: 1 },
    { firstName: "Olivia", lastName: "Davis", id: 4, degreeProgramID: 2 },
    { firstName: "Erik", lastName: "Vasquez", id: 5, degreeProgramID: 2 }
];

let courses = [
    {
        id: 1,
        name: "JavaScript Grundlagen",
        ects: 5,
        semester: 1,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 2,
        name: "Datenbanken",
        ects: 6,
        semester: 2,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 3,
        name: "Algorithmen und Datenstrukturen",
        ects: 6,
        semester: 2,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 4,
        name: "Webentwicklung",
        ects: 3,
        semester: 3,
        degreeProgramID: 1,
        type: "ELECTIVE"
    },
    {
        id: 5,
        name: "Software Engineering",
        ects: 6,
        semester: 3,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 6,
        name: "Betriebssysteme",
        ects: 5,
        semester: 3,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 7,
        name: "Computernetzwerke",
        ects: 5,
        semester: 4,
        degreeProgramID: 1,
        type: "MANDATORY"
    },
    {
        id: 8,
        name: "Künstliche Intelligenz",
        ects: 6,
        semester: 5,
        degreeProgramID: 1,
        type: "ELECTIVE"
    },
    {
        id: 9,
        name: "IT-Sicherheit",
        ects: 5,
        semester: 5,
        degreeProgramID: 1,
        type: "ELECTIVE"
    },
    {
        id: 10,
        name: "Mobile App Entwicklung",
        ects: 5,
        semester: 6,
        degreeProgramID: 1,
        type: "VOLUNTARY"
    },

    {
        id: 11,
        name: "Wirtschaftsinformatik Grundlagen",
        ects: 5,
        semester: 1,
        degreeProgramID: 2,
        type: "MANDATORY"
    },
    {
        id: 12,
        name: "Betriebswirtschaftslehre",
        ects: 5,
        semester: 1,
        degreeProgramID: 2,
        type: "MANDATORY"
    },
    {
        id: 13,
        name: "Informationssysteme",
        ects: 6,
        semester: 2,
        degreeProgramID: 2,
        type: "MANDATORY"
    },

    {
        id: 14,
        name: "Machine Learning",
        ects: 6,
        semester: 1,
        degreeProgramID: 3,
        type: "MANDATORY"
    },
    {
        id: 15,
        name: "Data Mining",
        ects: 6,
        semester: 2,
        degreeProgramID: 3,
        type: "MANDATORY"
    }
]



let degreePrograms = [
    { id: 1, name: "Informatik Bachelor", totalEcts: 180 },
    { id: 2, name: "Wirtschaftsinformatik Bachelor", totalEcts: 180 },
    { id: 3, name: "Data Science Master", totalEcts: 120 }
];

let enrollments = [
    { id: 1, studentId: 1, courseId: 1, status: "FINISHED", grade: "" },
    { id: 2, studentId: 1, courseId: 2, status: "PLANNED", grade: "" },
    { id: 3, studentId: 1, courseId: 3, status: "PLANNED", grade: "" },
    { id: 4, studentId: 2, courseId: 1, status: "PLANNED", grade: "" },
    { id: 5, studentId: 3, courseId: 1, status: "PLANNED", grade: "" },
]


// Module exports bestimmt was eine JavaScript datei nach Außen gibt damit eine andere Datei es mit require benuitzuen kann 
module.exports = {
    students,
    courses,
    degreePrograms,
    enrollments
};