var express = require('express');
var router = express.Router();
var authController = require('../app/auth/auth.controller');

/**
 * @swagger
 * definitions:
 *  RegisterReq:
 *   description: Email and role of the new user
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: Email address of the new user
 *     example: 'sarahaime@domain.com.com'
 *     required: true
 *    role:
 *     type: string
 *     description: Role of the user
 *     enum: ['user', 'admin', 'super_user', 'super_admin']
 *     exmple: 'user'
 *     required: true
 *  Credentials:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: Email address of the user
 *     example: 'sarahaime@domain.com.com'
 *     required: true
 *    password:
 *      type: string
 *      description: User's password
 *      exmple: 'chocolate'
 *      required: true
 *  PasswordResetReq:
 *     type: object
 *     properties:
 *      email:
 *       type: string
 *       description: Email address of the user to reset password
 *       example: 'sarahaime@domain.com.com'
 *       required: true
 *  PasswordReq:
 *     type: object
 *     properties:
 *      email:
 *       type: string
 *       description: Email address of the user
 *       example: 'sarahaime@domain.com.com'
 *       required: true
 *      password:
 *       type: string
 *       description: user's password
 *       exmple: 'chocolate' 
 *       required: true
 *      token:
 *       type: string
 *       description: Valid password reset token sent by email
 *       exmple: 'cdYha9!_xB*HiMRVjowOPj-hfng_XEL1' 
 *       required: true
 *  ErrorRes:
 *     type: object
 *     properties:
 *      error:
 *       type: string
 *       description: error message
 *       example: 'Error message'
 *      
 *
 */



 /**
  * @swagger
  * /register:
  *  post:
  *   summary: Register an user
  *   description: Register an user using email and role
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/RegisterReq'
  *   responses:
  *    200:
  *     description: credentials of the user created succesfully
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/Credentials'
  *    500:
  *     description: Failure in creating user
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    400:
  *     description: Validation errors
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  */
router.route('/register')
  .post( authController.register);

  
 /**
  * @swagger
  * /login:
  *  post:
  *   summary: User login
  *   description: login an user using email and password, returns a bearer token
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Credentials'
  *   responses:
  *    200:
  *     description: login success
  *     content:
  *      application/json:
  *      schema:
  *       type: object
  *       properties:
  *       message:
  *        type: string
  *        description: welcome message
  *        example: 'welcome'
  *      accessToken:
  *       type: string
  *       description: bearer token
  *       exmple: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2U4QGNvbnRvc28uY29tIiwicm9sZSI6InVzZXIiLCJpZCI6IjYyNDIzOTNkNjA4YWMxODk0MmM5ZmQyZCIsImlhdCI6MTY0ODUwNzI2NSwiZXhwIjoxNjQ4NjgwMDY1fQ.S0dU0Dhlco_G0Ju8-wr-UC2bIIL5_CX9TdKaWFdftnU' 
  *    500:
  *     description: failure in login
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    400:
  *     description: validation errors
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  */
router.route('/login')
  .post( authController.login);



 /**
  * @swagger
  * /register:
  *  post:
  *   summary: Register an user
  *   description: Register an user using email and role
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/RegisterReq'
  *   responses:
  *    200:
  *     description: credentials of the user created succesfully
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/Credentials'
  *    500:
  *     description: Failure in creating user
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    400:
  *     description: Validation errors
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  */
  router.route('/register')
  .post( authController.register);



 /**
  * @swagger
  * /password-reset/{email}:
  *  post:
  *   summary: Email with password reset link request. Used to reset password of the user. 
  *   parameters:
  *      - in: path
  *        name: email
  *        schema:
  *          type: string
  *        required: true
  *        description: Email address of the user
  *   responses:
  *    200:
  *     description: Request sent success
  *    500:
  *     description: Internal server error
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    404:
  *     description: User with the given email address does not exist
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  */  
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
