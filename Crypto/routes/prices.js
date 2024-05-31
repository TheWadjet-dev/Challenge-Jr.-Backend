const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Middleware para comprobar caché
const checkCache = (req, res, next) => {
    const { coin } = req.params;
    req.redisClient.get(coin, (err, data) => {
        if (err) {
            console.error('Redis error: ', err);
            return res.status(500).send('Redis error');
        }
        if (data !== null) {
            return res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

// Ruta para obtener precios de criptomonedas
//Usamos una API gratuita de y codigo abierto
router.get('/:coin', checkCache, async (req, res) => {
    try {
        const { coin } = req.params;
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
        if (!response.ok) {
            throw new Error('Error fetching data from CoinGecko');
        }
        const data = await response.json();
        req.redisClient.setex(coin, 60, JSON.stringify(data));
        res.send(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
