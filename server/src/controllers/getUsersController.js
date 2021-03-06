const GetUsersService = require('../services/getUsersService')
const CheckAdminService = require('../services/checkAdminService')

exports.getUsers = (req, res, next) => {

    CheckAdminService(req.decoded.id, function (err, result) {
        if (err) throw err
        else if (result) {
            GetUsersService(function (err, result) {
                if (err) {
                    throw err
                }
                else {
                    res.status(200).json({ data: result })
                }
            })
        }
        else {
            res.status(403).json({ message: 'Authorization required!'})
        }
    })

}