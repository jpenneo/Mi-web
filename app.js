require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors(
  {origin: ['http://localhost:3001', 'https://mi-web-delta.vercel.app'] }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, 
    require: true,
  },
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Conexión exitosa a PostgreSQL',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).send('Error al obtener empleados');
  }
});
// Cambiado a un puerto diferente
const port = process.env.PORT|| 3001; 
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});


