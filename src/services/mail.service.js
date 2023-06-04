import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        const config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL_ADDRESS,
                pass: process.env.SMTP_PASSWORD
            },
            poolConfig: {
                maxConnections: 3,
                maxMessages: 10,
                rateDelta: 1000,
                rateLimit: 5
            }
        };

        this.transporter = nodemailer.createTransport(config);
    }
    sendMail = async (toAddress, subject, content) => {
        const message = {
            from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_EMAIL_ADDRESS}>`,
            to: toAddress,
            subject: subject,
            html: content
        };

        await this.transporter.sendMail(message);
        console.log('Send mail sucessfully!!');
    }
}

export default new MailService();