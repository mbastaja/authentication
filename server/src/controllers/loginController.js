const LoginService = require('../services/loginService')
const CheckUsernameService = require('../services/checkUsernameService')


exports.login = (req, res, next) => {
    CheckUsernameService(req.body.username, function (err, result) {
        if (err) {
            throw err
        }
        else if (!result[0]) {
            return res.status(401).json({ message: 'Email or password is incorrect!' })
        }
        else {
            LoginService(req.body, function (err, tokens) {
                if (err) throw err
                else if (!tokens) {
                    return res.status(401).json({ message: 'Email or password is incorrect!' })

                }
                else{
                    return res.status(200).json({ message: 'Logged in', tokens, result})
                }
            })
        }
    })
}