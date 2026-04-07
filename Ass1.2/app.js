const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [];

// Fake async DB
const fakeDB = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 500);
    });
};

// 🌐 UI Page
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Student Dashboard</title>

<style>
body {
    font-family: Arial;
    background: linear-gradient(135deg, #1f4037, #99f2c8);
    margin: 0;
    color: #333;
}

.container {
    width: 80%;
    margin: 30px auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
}

h1 {
    text-align: center;
}

input {
    padding: 10px;
    margin: 5px;
    width: 200px;
}

button {
    padding: 10px;
    margin: 5px;
    border: none;
    background: #1f4037;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #14532d;
}

table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

th {
    background: #1f4037;
    color: white;
    padding: 10px;
}

td {
    padding: 10px;
    text-align: center;
}

/* Odd/Even styling */
tr:nth-child(even) { background: #f2f2f2; }
tr:nth-child(odd) { background: #ffffff; }

/* Animation */
.fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.delete-btn {
    background: red;
}
</style>
</head>

<body>

<div class="container">
    <h1>📊 Student Dashboard</h1>

    <input id="name" placeholder="Student Name">
    <input id="company" placeholder="Company">
    <button onclick="addStudent()">➕ Add</button>

    <br>

    <input id="search" placeholder="🔍 Search..." onkeyup="filterTable()">

    <table id="table">
        <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Action</th>
        </tr>
    </table>
</div>

<script>
// ➕ Add Student
async function addStudent() {
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;

    if (!name || !company) {
        alert("Fill all fields!");
        return;
    }

    await fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company })
    });

    document.getElementById("name").value = "";
    document.getElementById("company").value = "";

    loadStudents();
}

// 📄 Load Students
async function loadStudents() {
    const res = await fetch("/students");
    const data = await res.json();

    const table = document.getElementById("table");
    table.innerHTML = \`
        <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Action</th>
        </tr>\`;

    data.forEach((s, index) => {
        table.innerHTML += \`
        <tr class="fade-in">
            <td>\${s.name}</td>
            <td>\${s.company}</td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(\${index})">🗑 Delete</button>
            </td>
        </tr>\`;
    });
}

// 🗑 Delete Student
async function deleteStudent(index) {
    await fetch("/students/" + index, { method: "DELETE" });
    loadStudents();
}

// 🔍 Search Filter
function filterTable() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#table tr");

    rows.forEach((row, i) => {
        if (i === 0) return;

        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// Load on start
loadStudents();
</script>

</body>
</html>
`);
});

// ➕ Add Student
app.post("/students", async (req, res) => {
    const student = req.body;
    await fakeDB(student);
    students.push(student);
    res.json({ message: "Added" });
});

// 📄 Get Students
app.get("/students", async (req, res) => {
    const data = await fakeDB(students);
    res.json(data);
});

// 🗑 Delete Student
app.delete("/students/:index", async (req, res) => {
    const index = req.params.index;
    await fakeDB();
    students.splice(index, 1);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});