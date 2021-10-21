const Joi = require('joi')
const PasswordComplexity = require("joi-password-complexity")

const registerSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: new PasswordComplexity({
        min: 6,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requiredCount: 4
    }),
    email: Joi.string().email(),
    fullname: Joi.string().pattern(new RegExp('^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$')).required()
})

const updateSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().alphanum(),
    password: new PasswordComplexity({
        min: 6,
        max: 200,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requiredCount: 4
    }),
    email: Joi.string().email(),
    fullname: Joi.string().pattern(new RegExp('^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$')),
    role: Joi.string(),
    accessToken: Joi.string(),
    refreshToken: Joi.string()
})

module.exports = {
    registerSchema,
    updateSchema
}