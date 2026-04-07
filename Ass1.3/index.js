const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

app.use(express.json());

// 🔗 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/placementDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ➕ ADD Student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.json({ message: "Student added", data: student });
    } catch (error) {
        res.status(500).json({ error });
    }
});


// 📥 GET All Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});


// ✏️ UPDATE Student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(student);
});


// ❌ DELETE Student
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
});


// 🎯 FILTER: Get only placed students
app.get('/placed', async (req, res) => {
    const students = await Student.find({ placed: true });
    res.json(students);
});


// 🚀 Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});