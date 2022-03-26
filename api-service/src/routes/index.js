var express = require('express');
var router = express.Router();
var userController = require('../user-authentication/user-authentication-controller');

router.get('/', function(req, res, next) {
  res.status(200).json({Say: "Hello world"})
});

router.route('/user/register')
  .post(userController.register);

module.exports = router;
