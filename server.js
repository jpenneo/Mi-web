const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Cliente para PostgreSQL
const path = require('path');

// Configuración del servidor
const app = express();
app.use(cors());
app.use(express.json());

// Configurar variables de entorno para la base de datos
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener empleados
app.get('/empleados', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleados');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).send('Error al obtener empleados');
    }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
