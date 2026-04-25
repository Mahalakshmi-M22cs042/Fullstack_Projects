const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const errorMsg = document.getElementById("errorMsg");

const API = "/api/students";

async function fetchStudents() {
    const res = await fetch(API);
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(s => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>👤 ${s.name} | 📧 ${s.email} | 🎂 ${s.age}</span>
            <button class="delete-btn" onclick="deleteStudent('${s._id}')">❌</button>
        `;

        list.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value;

    if (name.length < 3) return showError("Name too short");
    if (!email.includes("@")) return showError("Invalid email");
    if (age < 18 || age > 60) return showError("Invalid age");

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

async function deleteStudent(id) {
    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        fetchStudents();
    } catch (err) {
        showError("Delete failed");
    }
}

function showError(msg) {
    errorMsg.textContent = msg;
}

fetchStudents();