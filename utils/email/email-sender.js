import nodemailer from 'nodemailer';
import verificationTemplate from "../templates/verification-template.js"

const sendVerificationEmail = async(user,OTP)=>{
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Verification OTP',
    html: verificationTemplate(OTP),
  };
  try{
const info = await transporter.sendMail(mailOptions);
console.log(
  `${new Date().toLocaleString()} - Email sent successfully:` +
    info.response
);
  }catch{
    console.log('Email error:', error.message);
    throw new Error('Could not send verification email.');
  }
  };

  export default sendVerificationEmail;


const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
};

export { sendMail };