const UserModel = require('../models/user'); 
const bcrypt = require('bcrypt');

const register = async (data) => {
  let randomPassword = generateRandomPassword();
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(randomPassword, salt);
  let newUser = new UserModel({...data, password : passwordHash});
  let savedUser = await newUser.save();

  return { email: savedUser.email , password: randomPassword }; 
};

const login = (data) => {
    
};



const isEmailInUse = async (email) => {
  let user = await UserModel.findOne({ email: email});
  console.log(user);
  return user != null;
}


const resetPassword = (data) => {
    
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


module.exports = { register, login,  resetPassword, isEmailInUse };