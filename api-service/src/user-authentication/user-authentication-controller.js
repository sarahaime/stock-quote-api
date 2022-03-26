const userService = require('./user-authentication-service');

const register = async (req, res) => {
    try {
        let password = await userService.register(req.body);
        res.json({
            error: null,
            data: password
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = { register };

