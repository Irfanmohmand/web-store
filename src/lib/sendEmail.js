import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  try {
    // Choose email provider based on environment variable
    const emailProvider = process.env.EMAIL_PROVIDER || "gmail";
    
    let transporter;
    
    if (emailProvider === "resend") {
      // Resend SMTP configuration (recommended for production)
      transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      });
    } else if (emailProvider === "sendgrid") {
      // SendGrid SMTP configuration
      transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    } else if (emailProvider === "smtp") {
      // Generic SMTP configuration (for custom SMTP servers)
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Gmail (default - works only for your own email)
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    const info = await transporter.sendMail({
      from: `"Web-Store" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Web-Store Account",
      text: `Hello,\n\nThank you for signing up with Web-Store!\n\nPlease verify your email address by clicking the link below:\n${verifyUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't create an account, please ignore this email.\n\nBest regards,\nWeb-Store Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1f2937 0%, #dc2626 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Web-Store</h1>
                    </td>
                  </tr>
                  
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">Verify Your Email Address</h2>
                      <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.5;">
                        Thank you for signing up with Web-Store! We're excited to have you join our learning community.
                      </p>
                      <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.5;">
                        Please verify your email address by clicking the button below:
                      </p>
                      
                      <!-- Button -->
                      <table role="presentation" style="margin: 0 auto;">
                        <tr>
                          <td style="border-radius: 6px; background: linear-gradient(135deg, #1f2937 0%, #dc2626 100%);">
                            <a href="${verifyUrl}" target="_blank" style="display: inline-block; padding: 14px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px;">
                              Verify Email Address
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 30px 0 20px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                        If the button doesn't work, copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0 0 20px 0; color: #3b82f6; font-size: 14px; word-break: break-all;">
                        ${verifyUrl}
                      </p>
                      
                      <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                        <strong>Note:</strong> This verification link will expire in 1 hour for security reasons.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px;">
                        If you didn't create an account with Web-Store, please ignore this email.
                      </p>
                      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        © ${new Date().getFullYear()} Web-Store. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("📧 MessageId:", info.messageId);
    console.log("📧 Response:", info.response);

    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error);
    throw error;
  }
};