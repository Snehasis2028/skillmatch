const form = document.getElementById("skillForm");
const passport = document.getElementById("passport");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const branch = document.getElementById("branch").value;
    const skills = document.getElementById("skills").value;
    localStorage.setItem("studentSkills", skills);
    const projects = document.getElementById("projects").value;
    const certificates = document.getElementById("certificates").value;

    // Convert skills into separate badges
    const skillArray = skills.split(",");

    let skillHTML = "";

    skillArray.forEach(function(skill) {
        skillHTML += `<span class="skill">${skill.trim()}</span>`;
    });

    passport.innerHTML = `
        <div class="passport-card">

            <div class="passport-header">
                <h2>🪪 Skill Passport</h2>
                <p>Verified Student Skill Profile</p>
            </div>

            <div class="student-name">
                ${name}
            </div>

            <div class="info">
                <strong>College:</strong> ${college}
            </div>

            <div class="info">
                <strong>Branch:</strong> ${branch}
            </div>

            <div class="passport-section">
                <h3>💻 Skills</h3>

                <div class="skill-list">
                    ${skillHTML}
                </div>
            </div>

            <div class="passport-section">
                <h3>🚀 Projects</h3>
                <p>${projects}</p>
            </div>

            <div class="passport-section">
                <h3>🏆 Certificates</h3>
                <p>${certificates || "No certificates added"}</p>
            </div>

        </div>
    `;

    form.style.display = "none";

    passport.scrollIntoView({
        behavior: "smooth"
    });
});

function checkMatch() {

    // Student skills
    const savedSkills = localStorage.getItem("studentSkills") || "";

    const studentSkills = savedSkills
    .toLowerCase()
    .split(",")
    .map(skill => skill.trim());

    // Skills required by the opportunity
    const requiredSkills = [
        "html",
        "css",
        "javascript",
        "react"
    ];

    let matchedSkills = [];
    let missingSkills = [];

    requiredSkills.forEach(function(skill) {

        if (studentSkills.includes(skill)) {
            matchedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }

    });

    const percentage =
        Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
        );

    document.getElementById("matchResult").innerHTML = `

        <h2>🎯 Match: ${percentage}%</h2>

        <h3>✅ Matching Skills</h3>
        <p>${matchedSkills.join(", ")}</p>

        <h3>❌ Missing Skills</h3>
        <p>${missingSkills.join(", ")}</p>

        <p>
            You have ${matchedSkills.length}
            out of ${requiredSkills.length}
            required skills.
        </p>
    `;
}
fetch("http://localhost:5000/")
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Backend connection error:", error);
    });