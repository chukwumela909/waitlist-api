import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            //   host: process.env.SMTP_HOST,
            service: 'gmail',
            auth: {
                user: 'taskhub866@gmail.com',
                pass: 'jyqn hbhf lljk wkgv'
            },
            logger: true,
        });
    }

    private getConfirmationEmailHTML(email: string): string {
        return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Welcome to Our Waitlist!</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; }
            .button { display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 You're on the waitlist!</h1>
            </div>
            <div class="content">
                <h2>Hi there!</h2>
                <p>Thanks for joining our waitlist! We're excited to have you on board.</p>
                <p>Your email <strong>${email}</strong> has been successfully added to our waitlist.</p>
                <p>We'll keep you updated on our progress and let you know as soon as we're ready to launch!</p>
                <p>Stay tuned for exciting updates! 🚀</p>
            </div>
            <div class="footer">
                <p>Thanks for your patience!</p>
                <p>The Team</p>
            </div>
        </div>
    </body>
    </html>
    `;
    }

    async sendConfirmationEmail(email: string): Promise<void> {
        await this.transporter.sendMail({
            from: 'No reply <hello@ngtaskhub.com>',
            to: email,
            subject: '🎉 Welcome to our waitlist!',
            html: this.getConfirmationEmailHTML(email)
        });
    }
}

export const emailService = new EmailService();