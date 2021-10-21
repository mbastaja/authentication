const LoginService = require('../services/loginService')
const CheckUsernameService = require('../services/checkUsernameService')


exports.login = (req, res, next) => {
    CheckUsernameService(req.body.username, function (err, result) {
        if (err) {
            throw err
        }
        else if (!result[0]) {
            return res.status(404).json({ message: 'User not found' })
        }
        else {
            LoginService(req.body, function (err, tokens) {
                if (err) throw err
                else if (!tokens) {
                    return res.status(401).json({ message: 'Wrong password' })

                }
                else{
                    let data = { 
                        id: result[0].id,
                        username: result[0].username,
                        fullname: result[0].fullname,
                        role: result[0].role
                    }
                    return res.status(200).json({ message: 'Logged in', tokens, data})
                }
            })
        }
    })
}