const express = require('express');
const redis = require('redis');
const priceRoutes = require('./routes/prices');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Redis
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Middleware para añadir el cliente de Redis a las rutas
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

// Rutas de precios
app.use('/price', priceRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
