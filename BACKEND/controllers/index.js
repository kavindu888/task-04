const controllers = {};

controllers.singup = require('./signup');
controllers.verifyOtp = require('./verifyOtp');
controllers.resendOtp = require('./resendOtp');
controllers.login = require('./login');


module.exports = controllers;