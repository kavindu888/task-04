const express=require('express');
const { request } = require('http');
const router=express.Router();

const { login } = require('../controllers');



router.post('/',login.Find);

module.exports=router;