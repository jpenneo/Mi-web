// Cargar las variables de entorno desde .env
require('dotenv').config();  
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

// Crear una instancia del cliente de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,    
  host: process.env.DB_HOST,    
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT || 5432, 
  // Habilitar SSL solo en producción
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, 
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    // Verificar la hora actual de la base de datos
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

// Ruta para obtener los empleados
app.get('/empleados', async (req, res) => {
  try {
     // Consultar todos los empleados
    const result = await pool.query('SELECT * FROM empleados');
    // Enviar la lista de empleados como respuesta
    res.json(result.rows); 
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).send('Error al obtener empleados');
  }
});

// Configuración del puerto: usa el puerto proporcionado por Vercel o el puerto 3001 por defecto
// Usamos el puerto de producción (si está disponible), o el 3001 en local
const port = process.env.PORT || 3001; 
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
