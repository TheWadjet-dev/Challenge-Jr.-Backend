const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const Trade = require('../models/Trade');

class DatabaseController {
    constructor() {
        this.connect();
    }

    async connect() {
        const uri = "Ingresar su cadena de conexion Mongo Atlas"
        try {
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            throw new AppError('Database connection failed', 500);
        }
    }

    async getTrades() {
        try {
            const trades = await Trade.find();
            return trades;
        } catch (error) {
            throw new AppError('Failed to retrieve trades', 500);
        }
    }
}

module.exports = new DatabaseController();