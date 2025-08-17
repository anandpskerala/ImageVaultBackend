import { config } from "@/config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: config.email.host,
    port: 465,
    secure: true,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});


export const createPasswordResetEmail = (resetUrl: string, userEmail: string, companyName = "ImageVault") => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - ${companyName}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8fafc;
                padding: 20px 0;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                overflow: hidden;
            }
            
            .email-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
            }
            
            .logo {
                width: 60px;
                height: 60px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                color: white;
            }
            
            .email-title {
                color: #ffffff;
                font-size: 28px;
                font-weight: 600;
                margin: 0;
                letter-spacing: -0.5px;
            }
            
            .email-subtitle {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                margin-top: 8px;
                font-weight: 400;
            }
            
            .email-body {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 18px;
                color: #1a202c;
                margin-bottom: 24px;
                font-weight: 500;
            }
            
            .message {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 32px;
                line-height: 1.7;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff !important;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                margin: 0 auto;
                display: block;
                max-width: 250px;
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }
            
            .alternative-link {
                margin-top: 32px;
                padding: 20px;
                background-color: #f7fafc;
                border-radius: 8px;
                border-left: 4px solid #e2e8f0;
            }
            
            .alternative-text {
                font-size: 14px;
                color: #718096;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            .alternative-url {
                font-size: 13px;
                color: #4299e1;
                word-break: break-all;
                font-family: 'Courier New', monospace;
                background-color: #ffffff;
                padding: 8px 12px;
                border-radius: 4px;
                border: 1px solid #e2e8f0;
            }
            
            .security-notice {
                margin-top: 32px;
                padding: 16px;
                background-color: #fffbeb;
                border-radius: 8px;
                border: 1px solid #fed7aa;
            }
            
            .security-title {
                font-size: 14px;
                color: #92400e;
                font-weight: 600;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .security-text {
                font-size: 13px;
                color: #a16207;
                line-height: 1.6;
            }
            
            .email-footer {
                background-color: #f7fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }
            
            .footer-text {
                font-size: 14px;
                color: #718096;
                margin-bottom: 16px;
            }
            
            .footer-links {
                font-size: 12px;
                color: #a0aec0;
            }
            
            .footer-links a {
                color: #4299e1;
                text-decoration: none;
                margin: 0 8px;
            }
            
            .expiry-notice {
                font-size: 13px;
                color: #e53e3e;
                font-weight: 500;
                margin-top: 24px;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0 10px;
                }
                
                .email-header,
                .email-body,
                .email-footer {
                    padding: 30px 20px;
                }
                
                .email-title {
                    font-size: 24px;
                }
                
                .cta-button {
                    padding: 14px 24px;
                    font-size: 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <div class="logo">IV</div>
                <h1 class="email-title">Password Reset</h1>
                <p class="email-subtitle">Secure your account with a new password</p>
            </div>
            
            <div class="email-body">
                <div class="greeting">Hello,</div>
                
                <div class="message">
                    We received a request to reset the password for your ${companyName} account associated with <strong>${userEmail}</strong>. 
                    If you made this request, click the button below to create a new password.
                </div>
                
                <a href="${resetUrl}" class="cta-button">Reset My Password</a>
                
                <div class="expiry-notice">
                    ⏰ This link will expire in 1 hour for security reasons
                </div>
                
                <div class="alternative-link">
                    <div class="alternative-text">Button not working? Copy and paste this link:</div>
                    <div class="alternative-url">${resetUrl}</div>
                </div>
                
                <div class="security-notice">
                    <div class="security-title">
                        🔒 Security Notice
                    </div>
                    <div class="security-text">
                        If you didn't request this password reset, you can safely ignore this email. 
                        Your account remains secure and no changes have been made.
                    </div>
                </div>
            </div>
            
            <div class="email-footer">
                <div class="footer-text">
                    This email was sent by ${companyName}. If you have any questions, please contact our support team.
                </div>
                <div class="footer-links">
                    <a href="#">Help Center</a> •
                    <a href="#">Privacy Policy</a> •
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};
