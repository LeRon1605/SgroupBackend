import nodemailer from 'nodemailer';

class MailService {
    async sendMail(toAddress, subject, content) {
        const config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL_ADDRESS,
                pass: process.env.SMTP_PASSWORD
            }
        };

        const message = {
            from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_EMAIL_ADDRESS}>`,
            to: toAddress,
            subject: subject,
            html: content
        };

        const transporter = nodemailer.createTransport(config);
        await transporter.sendMail(message);
    }
}

export default new MailService();