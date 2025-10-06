import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './src/event_db.js';
import eventsRouter from './src/routes/events.js';
import categoriesRouter from './src/routes/categories.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routers
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API server listening on http://localhost:${PORT}`);
});
