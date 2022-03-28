const Joi = require('@hapi/joi');

const register = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    role: Joi.string().valid('user','admin', 'super_user', 'super_admin').required()
})

const login = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().required()
})


const resetPasswordRequest  = Joi.object({ 
    email: Joi.string().max(255).required().email(),
});

const resetPassword = Joi.object({
    userId:Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().required(),
})



module.exports = { register, login, resetPasswordRequest, resetPassword};