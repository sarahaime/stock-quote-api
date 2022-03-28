
const jwt  = require('jsonwebtoken')
require('dotenv').config();
//to authorize users based on roles
const authorize = (roles = []) => {
    return [
                verifyToken,
                (req, res, next) => {
                    if (roles.length && !roles.includes(req.user.role)) {
                        return res.status(401).json({ error: 'You are unauthorized to see this resource' });
                    }

                    // authentication and authorization successful
                    next();
                }
            ];
}

// Authenticate JWT token and attach user to request as req.user
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken) 
        return res.status(401).json({ error: 'Please login' });

    jwt.verify(accessToken, process.env.TOKEN_SECRET , (err, user) => {
        if (err) 
            return res.status(400).json({error: 'Invalid token, please login'});

        req.user = user;
        next();
      });
}

module.exports = { authorize };