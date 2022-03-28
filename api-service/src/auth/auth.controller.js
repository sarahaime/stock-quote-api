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
            return res.status(400).json({error: 'Email address already in use'})
    
        
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


const resetPasswordRequest = async(req, res)=>{

    try {
        
        const { error } = authRequestValidations.resetPasswordRequest.validate(req.body);
        if (error) 
        return res.status(400).send(error.details[0].message);

        const email = req.body.email;
        const isEmailInUse = await authService.isEmailInUse(email);

        if (!isEmailInUse)
            return res.status(400).send("User with given email does not exist");
    
        await authService.sendResetPasswordRequest(email);

        res.json({message: "Password reset link has been sent to your email account, please use it in the next 24 hours"});
      }catch (error) {
          res.status(500).json({error: "Unexpected error has occur"});
      }
    

}

module.exports = { register, login, resetPasswordRequest };

