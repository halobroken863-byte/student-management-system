const express = require('express');
const router = express.Router();



//This line imports the specific logic function you wrote to handle creating a student.
const {createStudent,
    getAllStudents,
    getstudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/StudentController');

const ValidateStudentInput = require('../Middleware/ValidateStudentInput');

router.post('', ValidateStudentInput, createStudent);  
router.get('',getAllStudents);
router.get('/:id',getstudentById);
router.put('/:id',ValidateStudentInput,updateStudent);
router.delete('/:id',deleteStudent);


module.exports = router;





