const EditUserService = require('../services/editUserService')
const CheckUsernameService = require('../services/checkUsernameService')
const CheckEmailService = require('../services/checkEmailService')
const GetUserService = require('../services/getUserService')

exports.edit = async (req, res, next) => {
    let currentUsername = '';
    let currentEmail = '';
    GetUserService(req.decoded.id, function (err, result) {
        if (err) {
            throw err
        }
        else {
            currentUsername = result[0].username
            currentEmail = result[0].email
        }
    })
    CheckUsernameService(req.body.username, function (err, result) {
        let usernameDb = ''
        if (err) {
            throw err
        }
        else if (result[0] && req.body.username !== currentUsername) {
            return res.status(400).json({
                message: `This username is already in use.`,
            })
            usernameDb = result[0].username
        }
        else if (req.body.username === currentUsername || req.body.username !== usernameDb) {
            CheckEmailService(req.body.email, function (err, result) {
                let emailDb = ''
                if (err) {
                    throw err
                }
                else if (result[0] && req.body.email !== currentEmail) {
                    return res.status(403).json({
                        message: `This email address is already in use.`
                    })
                    emailDb = result[0].email
                }
                else if (req.body.email === currentEmail || req.body.email !== emailDb) {
                    EditUserService(req, function (err, user) {
                        if (err) throw err
                        if (user) {
                            res.status(201).json({ error: false, message: `The user has been updated successfully!` })
                        }
                    })
                }
            })
        }
    })
}