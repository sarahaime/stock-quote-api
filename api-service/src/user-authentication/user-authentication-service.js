const UserModel = require('../models/user'); 

const register = async (data) => {
  let randPassword = generateRandomPassword();
  let newUser = new UserModel({...data, password : randPassword});
  let savedUser = await newUser.save();
  console.log(savedUser);

  return randPassword; 
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