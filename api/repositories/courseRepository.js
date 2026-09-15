const database = require("../data/database.js");

exports.getAllCourses = () => {
    return database.courses;
};


exports.getCourseById = (id) => {
    return database.courses.filter(
        course => courseIds.includes(course.id)
    );
};


exports.addCourse = (name, ects, semester, degreeProgramID, type) => {

    const newId = database.courses.length > 0
        ? Math.max(...database.courses.map(course => course.id)) + 1
        : 1;

    const newCourse = {
        id: newId,
        name: name,
        ects: ects,
        semester: semester,
        degreeProgramID: degreeProgramID,
        type: type
    };

    database.courses.push(newCourse);

    return newCourse;
};


exports.updateCourse = (id, name, ects, semester, degreeProgramID, type) => {

    const course = database.courses.find(
        course => course.id === Number(id)
    );

    if (!course) {
        return null;
    }

    course.name = name;
    course.ects = ects;
    course.semester = semester;
    course.degreeProgramID = degreeProgramID;
    course.type = type;

    return course;
};


exports.deleteCourse = (id) => {

    const courseIndex = database.courses.findIndex(
        course => course.id === Number(id)
    );

    if (courseIndex === -1) {
        return null;
    }

    const deletedCourse = database.courses[courseIndex];

    database.courses.splice(courseIndex, 1);

    return deletedCourse;
};


exports.getCoursesByDegreeProgram = (degreeProgramID, semester) => {

    let courses = database.courses.filter(
        course => course.degreeProgramID === Number(degreeProgramID)
    );

    if (semester !== undefined) {
        courses = courses.filter(
            course => course.semester === Number(semester)
        );
    }

    return courses;
}
