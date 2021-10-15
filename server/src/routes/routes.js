const router = require('express').Router()
const {body} = require('express-validator')
const {register} = require('../controllers/registerController')
// const {login} = require('../controllers/loginController')
const {getUsers} = require('../controllers/getUsersController')

router.post('/register', [
    body('username', "The username must be of minimum 5 characters lenght")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 5}),
    body('email', "The email must be of minimum 5 characters lenght")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 5}),
    body('fullname', "The email must be of minimum 5 characters lenght")
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 5}),
    body('password', "The password must be of minimum 8 characters")
    .notEmpty()
    .trim()
    .isLength({ min: 8}),
], register)

// router.post('login', [
//     body('username', "Invalid username")
//     .notEmpty()
//     .escape()
//     .trim()
//     .isEmail(),
//     body('password', "Invalid password")
//     .notEmpty()
//     .trim()
//     .isLength({ min: 8 }),
// ], login)

router.get('/getuser', getUsers)

module.exports = router