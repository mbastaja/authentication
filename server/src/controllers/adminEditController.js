const AdminEditService = require('../services/adminEditService')
const CheckUsernameService = require('../services/checkUsernameService')
const CheckEmailService = require('../services/checkEmailService')
const GetUserService = require('../services/getUserService')
const CheckAdminService = require('../services/checkAdminService')


exports.adminEdit = async (req, res, next) => {
    CheckAdminService(req.decoded.id, function (err, result) {
        if (err) throw err
        if (result) {
            let currentUsername = '';
            let currentEmail = '';
            GetUserService(req.body.id, function (err, result) {
                if (err) {
                    throw err
                }
                else {
                    currentUsername = result[0].username
                    currentEmail = result[0].email
                }
            })
            CheckUsernameService(req.body.username, function (err, result) {
                let usernameDb = result[0].username
                if (err) {
                    throw err
                }
                else if (result[0] && req.body.username !== currentUsername) {
                    return res.status(201).json({
                        message: `This username is already in use.`,
                    })
                }
                else if (req.body.username === currentUsername || req.body.username !== usernameDb) {
                    CheckEmailService(req.body.email, function (err, result) {
                        let emailDb = result[0].email
                        if (err) {
                            throw err
                        }
                        else if (result[0] && req.body.email !== currentEmail) {
                            return res.status(201).json({
                                message: `This email address is already in use.`
                            })
                        }
                        else if (req.body.email === currentEmail || req.body.email !== emailDb) {
                            AdminEditService(req, function (err, user) {
                                if (err) throw err
                                if (user) {
                                    res.status(201).json({
                                        error: false, message: `The user has been updated successfully by admin!`
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            res.status(403).json({ message: 'Authorization required!' })
        }
    })

}