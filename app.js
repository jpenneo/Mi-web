// Importar dependencias
const express = require('express');
const { Pool } = require('pg');

// Crear la aplicación Express
const app = express();

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  //Debemos poner nuestro Usuario
    user: 'postgres',        
  // o la dirección de nuestra base de datos en caso de que esta no estuviese en local
  host: 'localhost', 
   //nombre de nuestra base de datos
  database: 'empresa', 
 //colocamos nuestra contraseña 
  password: '93JDyiTvHuRpQEaDV28U', 
  // Puerto por defecto de PostgreSQL
  port: 5432,                 
});

// Ruta para verificar la conexión con PostgreSQL
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Conexión exitosa a PostgreSQL',
      // Muestra la fecha y hora de la consulta
      time: result.rows[0].now,  
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});
// Ruta para obtener todos los empleados desde la base de datos
app.get('/empleados', async (req, res) => {
    try {
      // Realizar una consulta para obtener todos los empleados
      const result = await pool.query('SELECT * FROM empleados');
       // Devuelve los resultados en formato JSON
      res.json(result.rows); 
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      res.status(500).send('Error al obtener empleados');
    }
  });

// Configurar el puerto para el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
