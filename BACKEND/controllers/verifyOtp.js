const UserOTPverification = require("../database/UserOTPverification");
const User = require("../database/user");
const bcrypt = require("bcrypt");

module.exports = {
  Find: async (req, res) => {
    let { userId, otp } = req.body;

    if (userId || otp) {
      const userVerificationRecords = await UserOTPverification.find({
        userId,
      });
      if (!userVerificationRecords.length <= 0) {
        const expiresAt = userVerificationRecords[0];
        const hashOTP = userVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOTPverification.deleteMany({ userId }).then(() => {
            
            res.json({
              status: "FAILED",
              message: "otp code has expired.plese requist again !",
            });
          });
        } else {
       const stringOtp=otp.toString();
         
         const valiedOtp = await bcrypt.compare(stringOtp, hashOTP);
          if (valiedOtp) {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPverification.deleteMany({ userId }).then(() => {
              res.json({
                status: "SUCCESS",
                message: "account has verified successfully . !",
              });
            });
          } else {
            res.json({
              status: "FAILED",
              message: "otp not valied !",
            });
          }
        }
      } else {
        res.json({
          status: "FAILED",
          message: "no user Id !",
        });
      }
    } else {
      res.json({
        status: "FAILED",
        message: "empty input fields !",
      });
    }
  },
};
