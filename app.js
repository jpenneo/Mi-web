require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Verificar variables DATABASE_URL ESTÉ DEFINIDA
if (!process.env.DATABASE_URL) {
  console.error(`Falta la variable de entorno DATABASE_URL`);
   // Termina la ejecución si falta una variable
  process.exit(1);
 }

// Configurar el servidor
const app = express();

// Configurar CORS
const corsOptions = {
// Define dominios específicos en producción
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*', 
};
app.use(cors(corsOptions));

// Configuración de archivos estáticos carpeta 'public'
app.use(express.static('public')); 

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Habilita SSL en producción
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, 
});

// Ruta para obtener los empleados
app.get('/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados'); 
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/db-status', async (req, res) => { 
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.json({
      message: 'Conexión exitosa a PostgreSQL',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    res.status(500).json({ error: 'Error al conectar a la base de datos' });
  }
});
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: 'public' });
});

// Configuración del puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

