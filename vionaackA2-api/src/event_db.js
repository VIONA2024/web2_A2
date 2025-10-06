import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Use .env or defaults
const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'charityevents_db',
  DB_CONNECTION_LIMIT = '10'
} = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(DB_CONNECTION_LIMIT),
  queueLimit: 0
});
