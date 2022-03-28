var express = require('express');
var router = express.Router();
var userController = require('../user/user-controller');

router.route('/register')
  .post( userController.register);

router.route('/login')
  .post( userController.login);


module.exports = router;
