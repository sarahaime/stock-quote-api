const authService = require('./auth.service');
const authRequestValidations = require('./auth.validations');

const register = async (req, res) => {
    try {
        const newUserData = req.body;

        const { error } = authRequestValidations.register.validate(newUserData);
        if (error) 
            return res.status(400).json({error: error.details[0].message})

        const isEmailInUse = await authService.isEmailInUse(newUserData.email);

        if (isEmailInUse) 
            return res.status(400).json({error: 'Email address is already in use'})
    
        
        const userCredential = await authService.register(newUserData);
        res.json(userCredential);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const login = async (req, res) =>{
    const userCredentials = req.body;
    const { error } = authRequestValidations.login.validate(userCredentials)
    if (error) 
        return res.status(400).json({error: error.details[0].message})

    const areValidCredentials = await authService.areValidCredentials(userCredentials);
    const isEmailInUse = await authService.isEmailInUse(userCredentials.email);

    if (!isEmailInUse) 
        return res.status(400).json({ error: 'User does not exist' });

    if(areValidCredentials){
        const accessToken = await authService.generateAccessToken(userCredentials);
        return res.header('Authorization', 'Bearer ' + accessToken).json({message: "Welcome 🙌", accessToken: accessToken});
    }

    return res.status(400).json({ error: 'Email and password not match' });
}

const passwordResetRequest = async(req, res)=>{
    try {
        
        const { error } = authRequestValidations.passwordResetRequest.validate(req.params);
        if (error) 
        return res.status(400).send(error.details[0].message);

        const email = req.params.email;
        const isEmailInUse = await authService.isEmailInUse(email);

        if (!isEmailInUse)
            return res.status(400).send("User with given email does not exist");
    
        await authService.sendResetPasswordRequest(email);

        res.json({message: "Password reset link has been sent to your email account, please use it in the next 24 hours"});
      }catch (error) {
          console.error(error);
          res.status(500).json({error: "An unexpected error has occurred"});
      }
}


const passwordReset = async(req, res)=>{
    try {
        const data = req.body;
        const { error } = authRequestValidations.passwordReset.validate(data);
        if (error) 
            return res.status(400).send(error.details[0].message);

        const isEmailInUse = await authService.isEmailInUse(data.email);
        if (!isEmailInUse)
            return res.status(400).send("User with given email does not exist");
    
        let passwordReseted = await authService.passwordReset(data);
        if(passwordReseted.error)
            return res.status(400).json(passwordReseted);

        res.json({message: "Password reset successfully!!"});
      }catch (error) {
          res.status(500).json({error: "Unexpected error has occure"});
      }

}


module.exports = { register, login, passwordResetRequest, passwordReset };

