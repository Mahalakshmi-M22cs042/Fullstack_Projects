const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ DB Connection Error:", err));

// Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
    console.log("\n🚀 Server is running successfully!");
    console.log(`👉 Local URL: http://localhost:${PORT}`);
    console.log("📌 Open this link in your browser to view the app\n");
});