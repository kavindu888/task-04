const mongoose = require("mongoose");
const User = require("../database/user");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const UserOtpVerification = require("../database/UserOTPverification");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  module.exports={
   sendOtpVerificationEmail : async ({ _id, email }, res) => {
        try {
          const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
          const mailOption = {
            from: "chatanyware888@gmail.com",
            to: email,
            subject: "verify your email",
            html: `<P>Enter <b>${otp}</b> in the mychat app for verify your account. <br>
           <b>this otp exsits in one hover</b></p>
            <p><b>Thank you!</b> <br>
            <b>mychat team</b></p>
            `,
          };
      
          const saltRounds = 10;
          const hashOtp = await bcrypt.hash(otp, saltRounds);
          const newOtpVerification = await new UserOtpVerification({
            userId: _id,
            otp: hashOtp,
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000,
          });
      
          await newOtpVerification.save();
          await transporter.sendMail(mailOption);
          res.json({
            status: "PENDING",
            message: "verification otp email sent",
            data: {
              userId: _id,
              email,
            },
          });
        } catch (error) {
          res.json({
            status: "FAILED",
            message: error.message,
          });
        }
      }
  }