const userRegister = (data) => ({
    
});

const userLogin = (data) => ({
    
});

const userResetPassword = (data) => ({
    
});


const generateRandomPassword = () => {
    const chars = "0123456789abcdef";
    const randomArray = Array.from(
      { length: 32 },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomPassword = randomArray.join("");
    return randomPassword;
  };

module.exports = { userRegister, userLogin,  userResetPassword };