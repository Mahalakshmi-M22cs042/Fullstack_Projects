const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const errorMsg = document.getElementById("errorMsg");

const API = "/api/students";

// LOAD STUDENTS
async function fetchStudents() {
    const res = await fetch(API);
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(s => {
        const div = document.createElement("div");
        div.className = "student";

        div.innerHTML = `
            <div>
                <b>${s.name}</b><br>
                <small>${s.email} | Age: ${s.age}</small>
            </div>

            <button class="delete-btn" onclick="deleteStudent('${s._id}')">
                Delete
            </button>
        `;

        list.appendChild(div);
    });
}

// ADD STUDENT
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput().value;
    const email = emailInput().value;
    const age = ageInput().value;

    if (name.length < 3) return showError("Name too short");
    if (!email.includes("@")) return showError("Invalid email");
    if (age < 18 || age > 60) return showError("Age 18–60 only");

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, age })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        form.reset();
        fetchStudents();
        showError("");

    } catch (err) {
        showError(err.message);
    }
});

// DELETE
async function deleteStudent(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchStudents();
}

// ERROR
function showError(msg) {
    errorMsg.textContent = msg;
}

// Helpers
const nameInput = () => document.getElementById("name");
const emailInput = () => document.getElementById("email");
const ageInput = () => document.getElementById("age");

// INIT
fetchStudents();