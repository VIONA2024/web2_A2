# usernameA2-api

Charity events REST API for PROG2002 Assessment 2.

## Prerequisites
- Node.js 18+
- MySQL 8+

## Setup
1. Create DB and seed data:
   ```sql
   -- Open MySQL and run the SQL file
   SOURCE ./sql/charityevents_db.sql;
   ```
2. Install & run:
   ```bash
   npm install
   npm run start
   ```

The server runs on `http://localhost:3000`.

## Endpoints
- `GET /api/health`
- `GET /api/categories`
- `GET /api/events` (all active; not suspended)
- `GET /api/events/upcoming` (>= today)
- `GET /api/events/search?date=YYYY-MM-DD&location=City&category_id=1`
- `GET /api/events/:id`
