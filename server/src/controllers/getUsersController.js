const GetUsersService = require('../services/getUsersService')

exports.getUsers = (req, res, next) => {
    GetUsersService(function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.status(200).json({ error: false, data: result })
        }
    })
}