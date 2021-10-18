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
    fullname: Joi.string().pattern(new RegExp('^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$')).required()
})

const updateSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().alphanum(),
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
    fullname: Joi.string().pattern(new RegExp('^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$')),
    role: Joi.string(),
    accessToken: Joi.string(),
    refreshToken: Joi.string()
})

module.exports = {
    registerSchema,
    updateSchema
}