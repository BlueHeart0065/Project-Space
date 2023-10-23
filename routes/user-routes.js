//dependencies
const express = require('express');
const joi = require('joi');
const passport = require('passport');

//exports
const userControl = require('../controllers/user');
const wrapAsync = require('../utils/wrapAsync');
const expressError = require('../utils/expressError');
const User = require('../models/user');

const router = express.Router();

router.get('/ProjectSpace/register' , userControl.register);

router.post('/ProjectSpace/register' , wrapAsync(userControl.postRegister));

router.get('/ProjectSpace/login' , userControl.login);

router.post('/ProjectSpace/login' , passport.authenticate('local' , {failureFlash : true , failureRedirect : '/ProjectSpace/login'}) , userControl.postLogin);

router.get('/ProjectSpace/logout' , userControl.logout);

module.exports = router;