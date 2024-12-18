// app.js

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const { Client } = require('pg');
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  client.connect()
    .then(() => {
      console.log('Conectado a la base de datos');
      return client.query('SELECT * FROM users');
    })
    .then(res => {
      console.log('Resultado de la consulta:', res.rows);
    })
    .catch(err => {
      console.error('Error de conexión o consulta', err.stack);
    })
    .finally(() => {
      client.end();
    });
  