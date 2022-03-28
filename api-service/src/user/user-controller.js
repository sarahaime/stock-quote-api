const userService = require('./user-service');
const userRequestValidations = require('./user-validations');

const register = async (req, res) => {
    try {
        const newUserData = req.body;

        
        const { error } = userRequestValidations.register.validate(newUserData)
        if (error) 
            return res.status(400).json({error: error.details[0].message})

        const isEmailInUse = await userService.isEmailInUse(newUserData.email);

        if (isEmailInUse) 
            return res.status(400).json({error: 'Email address already in use'})
    
        
        const userCredential = await userService.register(newUserData);
        res.json(userCredential);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res) =>{
    const userCredentials = req.body;
    const { error } = userRequestValidations.login.validate(userCredentials)
    if (error) 
        return res.status(400).json({error: error.details[0].message})

    const areValidCredentials = await userService.areValidCredentials(userCredentials);
    const isEmailInUse = await userService.isEmailInUse(userCredentials.email);

    if (!isEmailInUse) 
        return res.status(400).json({ error: 'User does not exist' });

    if(areValidCredentials){
        const accessToken = await userService.generateAccessToken(userCredentials);
        return res.header('Authorization', 'Bearer ' + accessToken).json({message: "Welcome 🙌", accessToken: accessToken});
    }

    return res.status(400).json({ error: 'Email and password not match' });
}

module.exports = { register, login };

