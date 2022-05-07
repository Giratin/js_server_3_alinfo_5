

const Student = function (name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
}

Student.fromObject = function (json) {
    //json structure
    //{
    //    "nom": "John",
    //    "age": "20",
    //    "classe": "A"
    //}
    return new Student(json.nom, json.age, json.classe);
}
// module.exports = Student;
// module.exports.Student = Student;
// module.exports = { Student: Student }
module.exports = { Student }