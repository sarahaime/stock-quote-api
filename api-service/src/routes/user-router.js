var express = require('express');
var router = express.Router();
var userController = require('../user/user-controller');

router.route('/user/register')
  .post( userController.register);

router.route('/user/login')
  .post( userController.login);


module.exports = router;
