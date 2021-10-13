const LoginService = require('../services/loginService')
const CheckService = require('../services/checkService')
// const { resourceLimits } = require('worker_threads')


exports.login = (req, res, next) => {
    CheckService(req.body.username, function (err, result) {
        if (err) {
            throw err
            return res.status(400).json({ message: err })
        }
        else if (!result[0]) {
            return res.status(401).json({ message: 'Email or password is incorrect!' })
        }
        else {
            LoginService(req.body, function (err, token) {
                if (err) throw err
                else if (!token) {
                    console.log('controller');
                    return res.status(401).json({ message: 'Email or password is incorrect!' })

                }
                else{
                    return res.status(200).json({ message: 'Logged in', token, result})
                }
            })
        }
    })
}