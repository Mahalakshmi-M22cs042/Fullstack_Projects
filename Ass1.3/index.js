const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Added CORS

const Student = require('./models/Student');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/placementDB')

.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));


// ➕ ADD Student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const saved = await student.save();

        res.status(201).json({
            message: "Student added successfully",
            data: saved
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding student",
            error: error.message
        });
    }
});


// 📥 GET All Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students",
            error: error.message
        });
    }
});


// ✏️ UPDATE Student
app.put('/students/:id', async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            message: "Student updated",
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating student",
            error: error.message
        });
    }
});


// ❌ DELETE Student
app.delete('/students/:id', async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting student",
            error: error.message
        });
    }
});


// 🎯 FILTER: Get only placed students
app.get('/placed', async (req, res) => {
    try {
        const students = await Student.find({ placed: true });
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching placed students",
            error: error.message
        });
    }
});


// 🏠 Default route
app.get('/', (req, res) => {
    res.send("🚀 Student Placement API is running...");
});


// 🚀 Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});