var express = require('express');
var router = express.Router();
var authController = require('../app/auth/auth.controller');

router.route('/register')
  .post( authController.register);

router.route('/login')
  .post( authController.login);

router.route('/password-reset/:email')
  .post( authController.resetPasswordRequest);

router.route('/password-reset')
  .post( authController.resetPassword);


router.route('/password-reset/:email/:token')
  .get( (req, res) => {
    const data = {
      email: req.params.email,
      token: req.params.token
    }
    return res.render('password-reset', data);
  });

module.exports = router;
