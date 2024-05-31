const express = require('express');
const DatabaseController = require('./controllers/databaseController');
const AppError = require('./utils/appError');
const tradeRoutes = require('./routes/trades');
const emailRoutes = require('./routes/email');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
    console.log(`Server running on port ${ port }`);
});