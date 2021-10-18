const router = require('express').Router()
const { register } = require('../controllers/registerController')
const { login } = require('../controllers/loginController')
const { edit } = require('../controllers/editUserController')
const { adminEdit } = require('../controllers/adminEditController')
const { superEdit } = require('../controllers/superEditController')
const { adminDelete } = require('../controllers/adminDeleteController')
const { getUsers } = require('../controllers/getUsersController')
const { getUser } = require('../controllers/getUserController')
const Validator = require('../middleware/validator')

router.post('/register', Validator('registerSchema'), register)

router.post('/login', login)

router.get('/getusers', getUsers)
router.get('/getuser', getUser)

router.patch('/edit', Validator('updateSchema'), edit)
router.patch('/adminedit', Validator('updateSchema'), adminEdit)
router.patch('/superedit', Validator('updateSchema'), superEdit)

router.delete('/admindelete/:id', adminDelete)

module.exports = router