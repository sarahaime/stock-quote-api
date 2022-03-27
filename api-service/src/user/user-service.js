const UserModel = require('../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (data) => {
  const randomPassword = generateRandomPassword();
  const salt = await bcrypt.genSalt(10);
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
      expiresIn: "24h",
    });

    return accessToken; 

}

const isEmailInUse = async (email) => {
  const user = await UserModel.findOne({ email: email});
  console.log(user);
  return user != null;
}


const resetPassword = (email) => {
    
};


const generateRandomPassword = () => {
  const chars = "0123456789abcdef";
  const randomArray = Array.from(
    { length: 32 },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomPassword = randomArray.join("");
  return randomPassword;
};


module.exports = { register, areValidCredentials, generateAccessToken, resetPassword, isEmailInUse };