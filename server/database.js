const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const getMentorById = async (id) => {
  const [res] = await pool.query("SELECT * FROM mentors WHERE id = ?", [id]);
  return res.length ? res[0] : null;
};

const getMentorByArea = async (field) => {
  const [res] = await pool.query(
    "SELECT * FROM mentors WHERE areaOfExpertise = ?",
    [field]
  );
  return res.length ? res : null;
};

module.exports = { getMentorByArea, getMentorById };
