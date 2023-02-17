// importing the required packages from the server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connecting to the database
mongoose.connect('mongodb+srv://jnmpadi:cyberpunk2077@school-management-clust.4kxczqq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true });

// Defining the student model schema and exporting the student model
const studentSchema = new mongoose.Schema({
    studentId: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: Number, required: true },
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

// Defining the routes for the two functionalities
// Get student details by student id
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findOne({ studentId: id });
        if (!student) {
            res.status(404).send('Student not found');
        } else {
            res.send(student);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Register new student by supplying student details
app.post('/students', async (req, res) => {
    const student = new Student({
        studentId: req.body.studentId,
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
    });
    try {
        const newStudent = await student.save();
        res.send(newStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

