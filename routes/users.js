var express = require('express');
const { Student } = require('../models/student.model');
var router = express.Router();

//import Student

/**
 * @Path /users
*/
router.get('/', function (req, res, next) {
  let student = new Student('John', '20', 'A');
  console.log(student);
  res.json(student);
});

router.get('/test', function (req, res, next) {
  const jsonObject = {
    nom: "John",
    age: "20",
    classe: "A"
  }
  var student = Student.fromObject(jsonObject);

  res.render('student', { student });
});

router.get('/classe', function (req, res, next) {
  res.send('respond with a test resource');
});


module.exports = router;
