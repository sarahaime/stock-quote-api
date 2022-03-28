const UserModel = require('../models/user.model'); 
const TokenModel = require('../models/token.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
  const user = await UserModel.findOne({ email: email });
  const token = await TokenModel.findOne({ userId: user._id });
  if (!token) {
        token = await new TokenModel({
            userId: user._id,
            token: generateRandomString()
        }).save();
  }

  const link = `${process.env.BASE_URL}/user/password-reset/${user._id}/${token.token}`;
  await sendEmail(user.email, "Password reset", link);

}




const resetPassword = async(userId, token, newPassword) => {
  const passwordResetToken = await TokenModel.findOne({ userId: userId });
  if (!passwordResetToken) {
    return {error: "Invalid or expired password reset token" };
  }
  const isValidToken = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValidToken) {
    return {error: "Invalid or expired password reset token" }
  }

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await UserModel.updateOne(
                  { _id: userId },
                  { $set: { password: passwordHash } },
                );


  await passwordResetToken.delete();
  return true;
};


const generateRandomString = () => {
  const chars = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+=-?><";
  const randomArray = Array.from(
    { length: 32 },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomPassword = randomArray.join("");
  return randomPassword;
};


module.exports = { register, areValidCredentials, generateAccessToken, resetPassword, sendResetPasswordRequest, isEmailInUse };