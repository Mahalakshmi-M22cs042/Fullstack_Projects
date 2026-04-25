const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ ONE
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) return res.status(404).json({ error: "Student not found" });

        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) return res.status(404).json({ error: "Student not found" });

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

module.exports = router;