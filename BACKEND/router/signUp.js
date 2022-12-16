const express=require('express');
const { request } = require('http');
const router=express.Router();

const { singup } = require('../controllers');



router.post('/',singup.Find);

module.exports=router;