const express = require('express');
const router = express.Router();
const DatabaseController = require('../controllers/databaseController');

router.get('/', async (req, res, next) => {
    try {
        const trades = await DatabaseController.getTrades();
        res.status(200).json({
            status: 'success',
            data: {
                trades
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;