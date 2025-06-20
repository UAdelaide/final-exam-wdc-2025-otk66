const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'DogWalkService'
});

// GET /api/dogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Dogs');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching dogs:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
