const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');

class EmailController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to,
            subject,
            text
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new AppError('Failed to send email', 500);
        }
    }
}

module.exports = new EmailController();