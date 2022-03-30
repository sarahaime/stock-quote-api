const UserModel = require('../../models/user.model'); 
const TokenModel = require('../../models/token.model');
const { sendEmail } = require('../../utils/mail.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { required } = require('@hapi/joi');
require('dotenv').config();

const register = async (data) => {
  const randomPassword = generateRandomString();
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const passwordHash = await bcrypt.hash(randomPassword, salt);
  const newUser = new UserModel({...data, password : passwordHash});
  const savedUser = await newUser.save();
  return { email: savedUser.email , password: randomPassword }; 
};

const areValidCredentials = async (userCredentials) => {
  const user = await UserModel.findOne({ email: userCredentials.email });
  const isValidCredential = await bcrypt.compare(userCredentials.password, user.password);
  return isValidCredential;
};

const generateAccessToken = async (userCredential) =>{
    const user = await UserModel.findOne({ email: userCredential.email });
    const accessToken = jwt.sign({
      email: user.email,
      role: user.role,
      id: user._id
     }, process.env.TOKEN_SECRET, {
      expiresIn: "48h",
    });

    return accessToken; 
}

const isEmailInUse = async (email) => {
  const user = await UserModel.findOne({ email: email});
  return user != null;
}

const sendResetPasswordRequest = async (email) =>{
  let token = await TokenModel.findOne({ email: email});
  if (token) {
    await token.delete();
  }

  token = await new TokenModel({
              email: email,
              token: generateRandomString()
          }).save();

  const link = `${process.env.BASE_URL}/password-reset/${email}/${token.token}`;
  await sendEmail(email, "Password reset", link);
}


const passwordReset = async(data) => {
  const email = data.email, token = data.token, newPassword = data.password;
  let passwordResetToken = await TokenModel.findOne({ email: email, token: token });
  if (!passwordResetToken) {
    return {error: "Invalid or expired password reset token" };
  }

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await UserModel.updateOne(
                  { email: email },
                  { $set: { password: passwordHash } },
                );


  await passwordResetToken.delete();
  return true;
};


const generateRandomString = () => {
  const chars = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#*()_-";
  const randomArray = Array.from(
    { length: 32 },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomPassword = randomArray.join("");
  return randomPassword;
};


module.exports = { register, areValidCredentials, generateAccessToken, passwordReset, sendResetPasswordRequest, isEmailInUse };