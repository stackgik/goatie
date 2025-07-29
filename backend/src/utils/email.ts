import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or any other service
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Function to send the reset email
// prettier-ignore
const sendResetEmail = async ( protocol: string, host: string, email: string, resetToken: string ) => {
  //const resetURL = `${protocol}://${host}/api/v1/user/reset-password/${resetToken}`; // Replace with your frontend URL
  const resetURL = `${protocol}://${host}/forgot-password/reset/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // Sender address
    to: email, // Recipient address
    subject: 'Password Reset Request', // Email subject
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetURL}\n\nThis link will expire in 10 minutes.`, // Plain text body
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetURL}">${resetURL}</a>
           <p>This link will expire in <strong>10 minutes</strong>.</p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error('There was an error sending the email. Try again later!');
  }
};

export { sendResetEmail };
