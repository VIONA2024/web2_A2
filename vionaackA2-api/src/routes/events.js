import express from 'express';
import { pool } from '../event_db.js';

const router = express.Router();

// GET /api/events  -> list all active (not suspended) and not past (>= today)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, c.name AS category_name, o.name AS organisation_name
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN organisations o ON e.organisation_id = o.id
      WHERE e.suspended = 0
      ORDER BY e.event_date ASC, e.event_time ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch events' });
  }
});

// GET /api/events/upcoming -> convenience: only upcoming (>= today)
router.get('/upcoming', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, c.name AS category_name, o.name AS organisation_name
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN organisations o ON e.organisation_id = o.id
      WHERE e.suspended = 0
        AND e.event_date >= CURDATE()
      ORDER BY e.event_date ASC, e.event_time ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch upcoming events' });
  }
});

// GET /api/events/search?date=YYYY-MM-DD&location=City or substring&category_id=#
router.get('/search', async (req, res) => {
  try {
    const { date, location, category_id } = req.query;
    const where = ['e.suspended = 0', 'e.event_date >= CURDATE()']; // active & upcoming
    const params = [];

    if (date) {
      where.push('e.event_date = ?');
      params.push(date);
    }
    if (location) {
      where.push('(e.city LIKE ? OR e.location LIKE ?)');
      params.push(`%${location}%`, `%${location}%`);
    }
    if (category_id) {
      where.push('e.category_id = ?');
      params.push(category_id);
    }

    const sql = `
      SELECT e.*, c.name AS category_name, o.name AS organisation_name
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN organisations o ON e.organisation_id = o.id
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY e.event_date ASC, e.event_time ASC
    `;
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to search events' });
  }
});

// GET /api/events/:id -> event detail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT e.*, c.name AS category_name, o.name AS organisation_name
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN organisations o ON e.organisation_id = o.id
      WHERE e.id = ? AND e.suspended = 0
      LIMIT 1
    `, [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch event detail' });
  }
});

export default router;
