const { check } = require('express-validator')

exports.registerValidation = [
    check('fullname', 'fullname is required').not().isEmpty(),
    check('username', 'username is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
    check('email', 'please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]