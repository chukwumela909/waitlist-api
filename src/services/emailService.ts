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
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TaskHub Waitlist!</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .header {
            background: white;
            color: black;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="10" cy="90" r="1" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            animation: float 20s ease-in-out infinite;
            pointer-events: none;
        }

        @keyframes float {

            0%,
            100% {
                transform: translateX(0px) translateY(0px);
            }

            33% {
                transform: translateX(30px) translateY(-30px);
            }

            66% {
                transform: translateX(-20px) translateY(20px);
            }
        }

        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            border-radius: 16px;
            overflow: hidden;
            background: white;
            padding: 10px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {

            0%,
            20%,
            50%,
            80%,
            100% {
                transform: translateY(0);
            }

            40% {
                transform: translateY(-10px);
            }

            60% {
                transform: translateY(-5px);
            }
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }

        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
            position: relative;
            z-index: 2;
        }

        .content {
            padding: 40px 30px;
            background: #ffffff;
            position: relative;
        }

        .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
            text-align: center;
        }

        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 20px;
            text-align: center;
        }

        .email-highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 600;
        }

        .features {
            background: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }

        .features h3 {
            color: #2d3748;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .feature-list {
            list-style: none;
            padding: 0;
        }

        .feature-list li {
            padding: 8px 0;
            color: #4a5568;
            position: relative;
            padding-left: 25px;
        }

        .feature-list li::before {
            content: '✨';
            position: absolute;
            left: 0;
            top: 8px;
        }

        .cta-section {
            text-align: center;
            margin: 30px 0;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 25px 0;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: transform 0.3s ease;
        }

        .social-link:hover {
            transform: translateY(-2px);
        }

        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            position: relative;
        }

        .footer-content {
            color: #718096;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .brand-name {
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 18px;
        }

        .mailchimp-credit {
            position: absolute;
            bottom: 10px;
            right: 15px;
            font-size: 10px;
            color: #a0aec0;
            text-decoration: none;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
            margin: 30px 0;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }

            .header,
            .content,
            .footer {
                padding: 25px 20px;
            }

            .header h1 {
                font-size: 24px;
            }

            .welcome-text {
                font-size: 20px;
            }

            .features {
                padding: 20px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
           
                <img src="https://res.cloudinary.com/daf6mdwkh/image/upload/v1750868774/20250614_185641_iwuj1n.png"
                    alt="TaskHub Logo" height="80">
           
            <h1>🎉 Welcome to the Future!</h1>
            <p class="subtitle">You're officially on the TaskHub waitlist</p>
        </div>

        <div class="content">
            <h2 class="welcome-text">Hi there, productivity champion! 👋</h2>

            <p class="message">
                We're absolutely thrilled to have you join our exclusive waitlist! Your email
                <span class="email-highlight">${email}</span> has been successfully registered.
            </p>

            <div class="features">
                <h3>🚀 What's coming your way:</h3>
                <ul class="feature-list">
                    <li>Early access to TaskHub's revolutionary features</li>
                    <li>Exclusive beta testing opportunities</li>
                    <li>Direct line to our product team for feedback</li>
                </ul>
            </div>

            <div class="divider"></div>

            <p class="message">
                We're working around the clock to bring you the most intuitive task management
                experience ever created. Get ready to transform the way you organize your life! ⚡
            </p>

        </div>

        <div class="footer">
            <div class="footer-content">
                <p>Thank you for believing in our mission! 🙏</p>
                 <img src="https://res.cloudinary.com/daf6mdwkh/image/upload/v1750868774/20250614_185641_iwuj1n.png"
                    alt="TaskHub Logo" height="70">
            </div>
            <a href="#" class="mailchimp-credit">mailchimp</a>
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