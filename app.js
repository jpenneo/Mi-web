require('dotenv').config();// carga variables de entorno desde .env
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require("path");
const { sql } = require('@vercel/postgres');

// Define a port
const PORT = 3000;

// Configurar el servidor Express
const app = express();
app.use(express.json());
// Para que se utilice ejs
app.set("view engine", "ejs");


// Configuración de conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  ssl: { rejectUnauthorized: false }, // Habilita SSL para conexiones seguras
});

// Configurar CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*', // Configura en producción
};
app.use(cors(corsOptions));

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal para cargar el archivo index.html
app.get("/", (req,res) => {
  res.status(200).render("index", {pageTitle:"Mis mejores empleados"}); 
});

// Ruta para obtener y mostrar los empleados
app.get('/empleados-json', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM empleados');
      res.json(result.rows); // Devuelve los datos en formato JSON
  } catch (error) {
      console.error('Error al obtener empleados:', error.message);
      res.status(500).json({ error: 'Error al obtener empleados' });
  }
});
// Ruta para renderizar la vista empleados.ejs 
app.get('/empleados', (req, res) => { 
  res.render('empleados', { pageTitle: "Empleados" });
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

// Ruta para obtener los datos
app.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados');  // Consulta los empleados desde la base de datos

    // Renderiza la vista datos.ejs y pasa los datos a la vista
    res.render('datos', { 
      empleados: result.rows,
      pageTitle: "datos"
    });
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});


// Ruta 404 para manejar recursos no encontrados
app.use((req, res) => {
  res.status(404).render('404', { root: 'public' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;