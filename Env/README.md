
# Uso de Variables de Entorno
Las variables de entorno nos permiten mantener las credenciales fuera del código de desarrollo, lo que mejora la seguridad y facilita la configuración en diferentes entornos.

# Implementación

1. Crearemos un archivo .env el almacenará las variables de entorno. Este no debe ser incluido en el sistema de control de versiones.
```bash
  DB_USER=myDatabaseUser
  DB_PASS=myDatabasePassword
  DB_HOST=myDatabaseHost
  DB_NAME=myDatabaseName
```
2. Instalaremos el paquete dotenv, el cual cargará las variables de entorno desde el archivo .env al entorno del proceso Node.js.
```bash
  npm i dotenv
```
3. Usaremos las variables de entorno en nuestro código utilizando process.env.
```javascript
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
const tradeRoutes = require('./routes/trades');
const emailRoutes = require('./routes/email');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conectar a la base de datos
mongoose.connect(mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err.message));

app.use('/trades', tradeRoutes);
app.use('/send-email', emailRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

app.listen(port, () => {
    console.log(Server running on port ${port});
});
```