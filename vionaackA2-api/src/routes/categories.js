import express from 'express';
import { pool } from '../event_db.js';

const router = express.Router();

// GET /api/categories
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, description FROM categories ORDER BY name');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

export default router;
