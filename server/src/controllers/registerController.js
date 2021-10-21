const RegisterService = require('../services/registerService')
const CheckUsernameService = require('../services/checkUsernameService')
const CheckEmailService = require('../services/checkEmailService')
const LoginController = require('../controllers/loginController')

exports.register = async (req, res, next) => {

    CheckUsernameService(req.body.username, function (err, result) {
        if (err) {
            throw err
        }
        else if (result[0]) {
            return res.status(400).json({
                message: `This username is already in use.`,
            })
        }
        else {
            CheckEmailService(req.body.email, function (err, result) {
                if (err) {
                    throw err
                }
                else if (result[0]) {
                    return res.status(403).json({
                        message: `This email address is already in use.`
                    })
                }
                else {
                    RegisterService(req.body, function (err, user) {
                        if (err) {
                            throw err
                        }
                        else {
                            LoginController.login(req, res, next)
                        }
                    })
                }
            })
        }
    })
}
