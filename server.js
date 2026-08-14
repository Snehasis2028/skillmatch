const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("SkillMatch Backend is Running 🚀");
});

// Opportunities data
const opportunities = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        type: "Internship",
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 2,
        title: "Java Developer Intern",
        company: "CodeTech",
        type: "Internship",
        skills: ["Java", "DSA", "SQL"]
    },
    {
        id: 3,
        title: "Full Stack Developer Intern",
        company: "WebWorks",
        type: "Internship",
        skills: ["HTML", "CSS", "JavaScript", "Node.js"]
    }
];

// Get all opportunities
app.get("/api/opportunities", (req, res) => {
    res.json(opportunities);
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});