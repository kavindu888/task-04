const mongoose = require("mongoose");
const User = require("../database/user");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const UserOtpVerification = require("../database/UserOTPverification");
const nodemailer = require("nodemailer");
const sendOtpVerification=require('./sendOTPverification')
require("dotenv").config();

module.exports = {
  Find: async (req, res) => {
    let { firstName, lastName, email, password, confirmPassword, mobile } =
      req.body;

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    (confirmPassword = confirmPassword.trim()), (mobile = mobile.trim());

    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      mobile == ""
    ) {
      res.json({
        status: "FAILED",
        message: "empty input fields !",
      });
    } else if (!/^[a-zA-Z]*$/.test(firstName)) {
      res.json({
        status: "FAILED",
        message: "invalid firstName enterd !",
      });
    } else if (!/^[a-zA-Z]*$/.test(lastName)) {
      res.json({
        status: "FAILED",
        message: "invalid lastName enterd !",
      });
    } else if (!/^[a-z]*$/.test(password)) {
      res.json({
        status: "FAILED",
        message: "enter strong password !",
      });
    } else if (!password == confirmPassword) {
      res.json({
        status: "FAILED",
        message: "password not match !",
      });
    } else if (!emailValidator.validate(email)) {
      res.json({
        status: "FAILED",
        message: "email address not valid !",
      });
    } else if (!/^[0-9]*$/.test(mobile)) {
      res.json({
        status: "FAILED",
        message: "phone number not valid !",
      });
    } else {
      //validation success

      try {
        User.find({ email }).then(async (result) => {
          if (result.length) {
            res.json({
              status: "FAILED",
              message: "you have arly account.plase login in !",
            });
          } else {
            //user save
            const hash = await bcrypt.hash(password, 10);

            //console.log('hash is' + hash);
            try {
              const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                mobile: mobile,
                verified: false,
              });
              await newUser.save().then((reslt) => {
                sendOtpVerification.sendOtpVerificationEmail(reslt, res);
               // sendOtpVerificationEmail(reslt, res);
              });
            } catch (error) {
              res.json({
                status: "FAILED",
                message: error.message,
              });

              //res.send(error.message);
            }
          }
        });
      } catch (error) {}
    }
  },

 };

// const sendOtpVerificationEmail = async ({ _id, email }, res) => {
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     const mailOption = {
//       from: "chatanyware888@gmail.com",
//       to: email,
//       subject: "verify your email",
//       html: `<P>Enter <b>${otp}</b> in the mychat app for verify your account. <br>
//      <b>this otp exsits in one hover</b></p>
//       <p><b>Thank you!</b> <br>
//       <b>mychat team</b></p>
//       `,
//     };

//     const saltRounds = 10;
//     const hashOtp = await bcrypt.hash(otp, saltRounds);
//     const newOtpVerification = await new UserOtpVerification({
//       userId: _id,
//       otp: hashOtp,
//       createdAt: Date.now(),
//       expireAt: Date.now() + 3600000,
//     });

//     await newOtpVerification.save();
//     await transporter.sendMail(mailOption);
//     res.json({
//       status: "PENDING",
//       message: "verification otp email sent",
//       data: {
//         userId: _id,
//         email,
//       },
//     });
//   } catch (error) {
//     res.json({
//       status: "FAILED",
//       message: error.message,
//     });
//   }
// };
