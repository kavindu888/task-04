const mongoose=require('mongoose');

const schema=mongoose.Schema;

const UserOTPverificationSchema=new schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expireAt:Date
});

const UserVerification=mongoose.model(
    "UserVerification",
    UserOTPverificationSchema
);
module.exports=UserVerification;
