const express=require('express');
const app=express();
const mongoose=require('mongoose');
require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_SERVER)
.then(()=>console.log('connected'))
.catch((err)=>console.log(err))

const signUp=require('./router/signUp');
const verifyOtp=require('./router/verifyOtp');
const resendOtp=require('./router/resendOtp');
const login=require('./router/login');

app.use(express.json());
app.use('/api/signup',signUp);
app.use('/api/verifyOtp',verifyOtp);
app.use('/api/resendOtp',resendOtp);
app.use('/api/login',login);
app.listen(4000);



