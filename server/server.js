const express = require("express");
const cors = require("cors");
const { getMentorByArea, getMentorById } = require("./database.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  return res.json("Hello from BACKEND");
});

app.get("/mentor", async (req, res) => {
  const field = req.query.field;
  try {
    const mentors = await getMentorByArea(field);
    if (mentors) {
      res.json(mentors);
    } else {
      res.status(404).json({ message: "Mentors not found" });
    }
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mentor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await getMentorById(id);
    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({ message: "Mentor not found" });
    }
  } catch (error) {
    console.error("Error fetching mentor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
