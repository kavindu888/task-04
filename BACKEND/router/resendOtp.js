const express=require('express');
const { request } = require('http');
const router=express.Router();

const { resendOtp } = require('../controllers');



router.post('/',resendOtp.Find);

module.exports=router;