const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tablehub_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database via XAMPP');
    connection.release();
  }
});

// Basic Routes
app.get('/', (req, res) => {
  res.send('TableHub API is running');
});

// Mock Login Route (Replace with real DB logic later)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // For now, mirroring the frontend mock logic but this is where DB query goes
  if (email === 'a' && password === 'a') {
    res.json({ user: { id: '1', name: 'Admin', email, role: 'admin' } });
  } else if (email === 'm' && password === 'm') {
    res.json({ user: { id: '2', name: 'Restaurant Manager', email, role: 'restaurant' } });
  } else if (email === 'u' && password === 'u') {
    res.json({ user: { id: '3', name: 'User', email, role: 'user' } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
