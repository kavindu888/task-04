const express=require('express');
const { request } = require('http');
const router=express.Router();

const { verifyOtp } = require('../controllers');



router.post('/',verifyOtp.Find);

module.exports=router;