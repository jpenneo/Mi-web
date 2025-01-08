require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { sql } = require('@vercel/postgres');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  ssl: { rejectUnauthorized: false }, // Habilita SSL para conexiones seguras
});

// Configurar el servidor Express
const app = express();

// Configurar CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*', // Configura en producción
};
app.use(cors(corsOptions));

// Configuración de archivos estáticos (carpeta 'public')
app.use(express.static('public'));

// Ruta para obtener los empleados
app.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados'); // Cambia 'empleados' por el nombre real de tu tabla
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Ruta para verificar la conexión a la base de datos
app.get('/db-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Consulta de prueba
    res.json({
      message: 'Conexión exitosa a PostgreSQL',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    res.status(500).json({ error: 'Error al conectar a la base de datos' });
  }
});

// Ruta para generar una página HTML dinámica
app.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados'); // Cambia los campos y tabla según tu base
    const empleados = result.rows;
  } 
    catch (err) {
    console.error('Error al generar la página de datos:', err);
    res.status(500).send('Error al cargar la página de datos');
  }
});

// Ruta 404 para manejar recursos no encontrados
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: 'public' });
});

// Configuración del puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
