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
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account.",
      html: `
        <h2>Email verification</h2>
        <p>Click below to verify your account.</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p style="margin-top: 20px; color: #666;">If the button doesn't work, copy and paste this link:</p>
        <p style="color: #666;">${verifyUrl}</p>
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