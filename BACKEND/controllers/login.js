const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../database/user");

module.exports = {
  Find: async (req, res) => {
    let { email, password } = req.body;
    if (email || password) {
      const userrecords = await User.find({
        email,
      });
      if (!userrecords.length <= 0) {
         const useId = userrecords[0].id;
        const hashPassword = userrecords[0].password;
       console.log(useId)
        const valiedPassword = await bcrypt.compare(password, hashPassword);
        if(valiedPassword){

            const token = jwt.sign(useId, process.env.TOKEN_KEY);
            res.json({
                status: "SUCCESS",
                message: "you login successfully !",
                tokenKey:token,
              });

        }else{
            res.json({
                status: "FAILED",
                message: "plese check your data !",
              }); 
        }
      } else {
        res.json({
          status: "FAILED",
          message: "you have not account plese sing up first !",
        });
      }
    } else {
      res.json({
        status: "FAILED",
        message: "enter all feilds !",
      });
    }
  },
};
