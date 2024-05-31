const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emailController');

router.post('/', async (req, res, next) => {
    const { to, subject, text } = req.body;

    try {
        await EmailController.sendEmail(to, subject, text);
        res.status(200).json({
            status: 'success',
            message: 'Email sent successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;