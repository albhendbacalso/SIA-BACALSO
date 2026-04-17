const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dataset
let students = [
    { id: 1, name: "Angelo1", yearLevel: 2 },
    { id: 2, name: "Angelo2", yearLevel: 2 },
    { id: 3, name: "Angelo3", yearLevel: 2 }
];

// GET all students
app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});

// GET student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

// ADD student
app.post('/api/students', (req, res) => {
    const { name, yearLevel } = req.body;

    if (!name || !yearLevel) {
        return res.status(400).json({ message: "Name and yearLevel required" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        yearLevel
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// UPDATE student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, yearLevel } = req.body;

    if (name) student.name = name;
    if (yearLevel) student.yearLevel = yearLevel;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deleted = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deleted[0]
    });
});

// SEARCH by name
app.get('/api/students/search/:name', (req, res) => {
    const result = students.filter(s =>
        s.name.toLowerCase().includes(req.params.name.toLowerCase())
    );

    res.status(200).json(result);
});

// FILTER by year level
app.get('/api/students/year/:yearLevel', (req, res) => {
    const result = students.filter(s => s.yearLevel == req.params.yearLevel);

    res.status(200).json(result);
});

// STATS
app.get('/api/students/stats', (req, res) => {
    res.status(200).json({
        totalStudents: students.length
    });
});

// RANDOM
app.get('/api/students/random', (req, res) => {
    const random = students[Math.floor(Math.random() * students.length)];
    res.status(200).json(random);
});

// TOP
app.get('/api/students/top', (req, res) => {
    res.status(200).json(students[0]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});