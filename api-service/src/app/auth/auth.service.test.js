const request = require('supertest');
const app = require('../../index');
const assert = require('assert');
const authService = require('./auth.service');
const UserModel = require('../../models/user.model'); 
const bcrypt = require('bcrypt');
const should = require('chai').should();
const expect = require('chai');
const { doesNotMatch } = require('assert');

describe('Authentication Service Tests', () => {
  describe('#register()',  () => {
   
    it('should return registered user email',  async () => {
      let newUser = { email: "newemail@testing.com", role: "user" }
      let registerAns = await authService.register(newUser);
      assert.equal(newUser.email, registerAns.email);
    });

    
    it('should return registered user password',  async () => {
        let newUser = { email: "newemail@testing.com", role: "user" }
        let registerAns = await authService.register(newUser);
        registerAns.password.should.be.a("string");
    });

    beforeEach(async () => {
      request(app);
      await UserModel.deleteMany();
  });


  });


  describe('#areValidCredentials()',  () => {
    let existingUser = {}, existingUserPassword;

    it('should return true',  async () => {
      let validCredentials = { email:existingUser.email, password: existingUserPassword }
      let areValidCredentials = await authService.areValidCredentials(validCredentials);
      assert.strictEqual(areValidCredentials, true);
    });

    it('should return false',  async () => {
      let invalidCredentials = { email: existingUser.email, password: existingUserPassword + 'Not valid part'}
      let areValidCredentials = await authService.areValidCredentials(invalidCredentials);
      assert.strictEqual(areValidCredentials, false);
    });

        
    it('should return false',  async () => {
      let invalidCredentials = { email: 'not_valid_part'+ existingUser.email, password: existingUserPassword }
      let areValidCredentials = await authService.areValidCredentials(invalidCredentials);
      assert.strictEqual(areValidCredentials, false);
      
    });

    beforeEach(async () => {
        request(app);
        await UserModel.deleteMany();
        existingUserPassword = "chocolate";
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const passwordHash = await bcrypt.hash(existingUserPassword, salt);

        existingUser = { 
          password: passwordHash,
          role: 'user',
          email: 'existingemail@testing.com'
        }
        await new UserModel(existingUser).save();
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });



  });

  describe('#isEmailInUse()',  () => {
    let existingUser = {};
    it('should return true',  async () => {
        let isEmailInUse = await authService.isEmailInUse(existingUser.email);
        assert.strictEqual(isEmailInUse, true);
    });

    it('should return false',  async () => {
      let notInUseEmail = "noinuse@testing.com"
      let isEmailInUse = await authService.isEmailInUse( notInUseEmail );
      assert.strictEqual(isEmailInUse, false);
    });

    beforeEach(async () => {
      request(app);
      await UserModel.deleteMany();
      existingUser = { 
        password: "123abc",
        role: 'user',
        email: 'existingemail@testing.com'
      }
      await new UserModel(existingUser).save();
    });

  });


  describe('#generateAccessToken()',  () => {
    let existingUser = {};
    it('should return a string',  async () => {
        let accessToken = await authService.generateAccessToken( existingUser );
        accessToken.should.be.a("string"); 
    });

    beforeEach(async () => {
      request(app);
      await UserModel.deleteMany();
      existingUserPassword = "chocolate";
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
      const passwordHash = await bcrypt.hash(existingUserPassword, salt);

      existingUser = { 
        password: passwordHash,
        role: 'user',
        email: 'existingemail@testing.com'
      }
      await new UserModel(existingUser).save();
      
  });

  });

});