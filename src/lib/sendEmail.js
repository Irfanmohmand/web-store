import nodemailer from "nodemailer";
export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account.",
    html: `
    <h2>Email verification</h2>
    <p>Click below to verify your account.</p>
    <a href="${verifyUrl}">Verify Email</a>
    `,
  });
};
