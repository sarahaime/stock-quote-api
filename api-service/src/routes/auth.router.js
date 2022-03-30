var express = require('express');
var router = express.Router();
var authController = require('../app/auth/auth.controller');

/**
 * @swagger
 * definitions:
 *  RegisterReq:
 *   description: email and role of the new user
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the new user
 *     example: 'sarahaime@jobsity.com'
 *     required: true
 *    role:
 *     type: string
 *     description: role of the user
 *     enum: ['user', 'admin', 'super_user', 'super_admin']
 *     exmple: 'user'
 *     required: true
 *   LoginReq:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: email of the user
 *      example: 'sarahaime@jobsity.com'
 *     password:
 *      type: string
 *      description: user's password
 *      exmple: 'chocolate'
 *    PasswordResetReq:
 *     type: object
 *     properties:
 *      email:
 *       type: string
 *       description: email of the user to reset password
 *       example: 'sarahaime@jobsity.com'
 *    PasswordReq:
 *     type: object
 *     properties:
 *      email:
 *       type: string
 *       description: email of the user
 *       example: 'sarahaime@jobsity.com'
 *      password:
 *       type: string
 *       description: user's password
 *       exmple: 'chocolate' 
 *      token:
 *       type: string
 *       description: valid password reset token sent by email
 *       exmple: 'cdYha9!_xB*HiMRVjowOPj-hfng_XEL1' 
 *
 */




 /**
  * @swagger
  * /register:
  *  post:
  *   summary: register an user
  *   description: Register an user using email and role
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/RegisterReq'
  *   responses:
  *    200:
  *     description: credentials of the user created succesfully
  *    500:
  *     description: failure in creating user
  *    400:
  *     description: validation errors
  */
router.route('/register')
  .post( authController.register);

router.route('/login')
  .post( authController.login);

router.route('/password-reset/:email')
  .post( authController.passwordResetRequest);

router.route('/password-reset')
  .post( authController.passwordReset);


router.route('/password-reset/:email/:token')
  .get( (req, res) => {
    const data = {
      email: req.params.email,
      token: req.params.token
    }
    return res.render('password-reset', data);
  });

module.exports = router;
