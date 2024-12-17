
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Verificar variables DATABASE_URL ESTÉ DEFINIDA

  if (!process.env.DATABASE_URL) {
    console.error(` Falta la variable de entorno DATABASE_URL`);
    // Termina la ejecución si falta una variable
    process.exit(1); 
  }


// Configurar el servidor
const app = express();

// Configurar CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*', // Define dominios específicos en producción
};
app.use(cors(corsOptions));

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //Habilita ssl en producción.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    // Consulta segura
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

// Ruta para obtener los empleados
app.get('/empleados', async (req, res) => {
  try {
    // Consulta parametrizada si es necesario
    const result = await pool.query('SELECT * FROM empleados'); 
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Configuración del puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
