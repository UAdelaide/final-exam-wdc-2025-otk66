
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'DogWalkService'
});

// GET /api/walkers/summary
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.user_id,
        u.username,
        COUNT(DISTINCT wa.application_id) AS total_applications,
        SUM(CASE WHEN wa.status = 'accepted' THEN 1 ELSE 0 END) AS accepted_applications,
        ROUND(AVG(wr.rating), 2) AS average_rating
      FROM Users u
      LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id
      LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id, u.username
      ORDER BY u.username
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching walker summaries:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
