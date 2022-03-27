const userService = require('./user-service');

const register = async (req, res) => {
    try {
        const newUserData = req.body;
        const isEmailInUse = await userService.isEmailInUse(newUserData.email);

        if (isEmailInUse) {
            return res.status(400).json({error: 'Email address already in use'})
        }
        
        const userCredential = await userService.register(newUserData);
        res.json(userCredential);
    } catch (error) {
        res.status(400).json({error})
    }
}

const login = async (req, res) =>{
    const userCredentials = req.body;
    const isValidCredential = await userService.areValidCredentials(userCredentials);
    const isEmailInUse = await userService.isEmailInUse(userCredentials.email);

    if (!isEmailInUse) 
        return res.status(400).json({ error: 'User does not exist' });

    if(isValidCredential){
        const accessToken = await userService.generateAccessToken(userCredentials);
        return res.header('auth-token', accessToken).json({message: "Welcome 🙌", token: accessToken});
    }

    return res.status(400).json({ error: 'Email and password not match' });
}

module.exports = { register, login };

