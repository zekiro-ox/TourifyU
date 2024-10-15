const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const firebase = require("firebase-admin");
const cors = require("cors")({ origin: true }); // Allow all origins

firebase.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: "rendellebertes@gmail.com",
    pass: "Manji@24",
  },
});

exports.sendOtp = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = firebase.auth().currentUser;

    if (!user) {
      return res.status(401).send("User  is not authenticated");
    }

    const mailOptions = {
      from: "your-email@gmail.com",
      to: user.email,
      subject: "OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending OTP code");
      }
      return res.status(200).send({ otp });
    });
  });
});
