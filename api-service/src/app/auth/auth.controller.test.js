const request = require('supertest');
const app = require('../../app');
const assert = require('assert');
const authService = require('./auth.service');
const UserModel = require('../../models/user.model'); 
const bcrypt = require('bcrypt');
const should = require('chai').should();
const expect = require('chai');
const { doesNotMatch } = require('assert');

describe("POST register", () => {
    let existingUser = {}, existingUserPassword;

    it("should register new user with valid credentials", (done) => {
      request(app)
        .post("/register")
        .send({email: "sara@testing.com", role: "user"})
        .expect(201)
        .then((res) => {
          res.body.password.should.be.a("string"); 
          done();
        })
        .catch((err) => done(err));
    });


    
    it("should not register new user with already in use email", (done) => {
        request(app)
          .post("/register")
          .send({email: existingUser.email, role: "user"})
          .expect(400)
          .then((res) => {
            res.body.error.should.be.a("string"); 
            done();
          })
          .catch((err) => done(err));
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