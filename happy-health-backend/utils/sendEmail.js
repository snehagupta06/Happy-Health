const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Happy Health" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP for Login",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
};

module.exports = sendOTPEmail;
