const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// 数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '你的MySQL密码',
  database: 'DogWalkService'
});

// GET /api/walkrequests/open
router.get('/open', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM WalkRequests
      WHERE status = 'open'
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching open walk requests:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
