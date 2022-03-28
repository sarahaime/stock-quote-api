const Joi = require('@hapi/joi');

const register = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    role: Joi.string().valid('user','admin', 'super_user', 'super_admin').required()
})

const login = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().required()
})


module.exports = { register, login };