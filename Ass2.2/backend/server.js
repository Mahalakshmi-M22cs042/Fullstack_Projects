const express = require("express");
const cors = require("cors");
const questions = require("./questions");

const app = express();

app.use(cors());
app.use(express.json());

// API
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});