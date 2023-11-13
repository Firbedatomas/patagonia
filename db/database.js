require('dotenv').config(); // Importar las variables de entorno del archivo .env

const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  port: dbPort,
  logging: false, // Desactivar logs de SQL (opcional)
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    // Aquí puedes agregar más código para manejar el error de manera adecuada,
    // como detener la aplicación o intentar reconectar
  }
};

// Probar la conexión
testConnection();

module.exports = sequelize;
