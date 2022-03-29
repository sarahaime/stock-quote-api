var express = require('express');
var router = express.Router();
var authController = require('../app/auth/auth.controller');

router.route('/register')
  .post( authController.register);

router.route('/login')
  .post( authController.login);


router.route('/reset-password/:email')
  .post( authController.resetPasswordRequest);

router.route('/reset-password')
  .post( authController.resetPassword);


module.exports = router;
