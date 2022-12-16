const mongoose = require("mongoose");
const sendOtpVerification = require("./sendOTPverification");
const UserOTPverification = require("../database/UserOTPverification");

module.exports = {
  Find: async (req, res) => {
    try {
      let { userId, email } = req.body;
      if (userId || email) {
        await UserOTPverification.deleteMany({ userId });
        sendOtpVerification.sendOtpVerificationEmail(
          { _id: userId, email },
          res
        );
      } else {
        res.json({
          status: "FAILED",
          message: "enter all feilds!",
        });
      }
    } catch (error) {
        res.json({
            status:"FAILED",
            message:error.message
        })
    }
  },
};
