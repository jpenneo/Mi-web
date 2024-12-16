//Esto carga las variables del archivo .env
require('dotenv').config(); 
// La dependencia para PostgreSQL
const { Pool } = require('pg'); 
// Importar la dependencia cors
const cors = require('cors'); 

// Crear la aplicación Express
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());  // Esto permite que tu servidor acepte solicitudes desde otros dominios (por ejemplo, tu frontend)

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  //Debemos poner nuestras variables de entorno, para que no se vean nuestras credenciales en el código
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,   
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
