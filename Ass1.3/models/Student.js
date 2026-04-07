const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    placed: Boolean,
    company: String,
    salary: Number
});

module.exports = mongoose.model('Student', studentSchema);