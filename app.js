require('dotenv').config();  // Cargar las variables de entorno desde .env
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

// Crear una instancia del cliente de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,    // Usuario de la base de datos
  host: process.env.DB_HOST,    // Host de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  port: process.env.DB_PORT || 5432, // Puerto de la base de datos (predeterminado es 5432)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Habilitar SSL solo en producción
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Verificar la hora actual de la base de datos
    res.json({
      message: 'Conexión exitosa a PostgreSQL',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Ruta para obtener los empleados
app.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados'); // Consultar todos los empleados
    res.json(result.rows); // Enviar la lista de empleados como respuesta
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).send('Error al obtener empleados');
  }
});

// Configuración del puerto: usa el puerto proporcionado por Vercel o el puerto 3001 por defecto
const port = process.env.PORT || 3001; // Usamos el puerto de producción (si está disponible), o el 3001 en local
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
