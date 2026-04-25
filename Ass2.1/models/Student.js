const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be below 60"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);