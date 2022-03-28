var express = require('express');
var router = express.Router();
var authController = require('../auth/auth.controller');

router.route('/register')
  .post( authController.register);

router.route('/login')
  .post( authController.login);


module.exports = router;
