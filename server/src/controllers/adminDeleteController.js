const AdminDeleteService = require('../services/adminDeleteService')
const CheckAdminService = require('../services/checkAdminService')

exports.adminDelete = async (req, res, next) => {
    CheckAdminService(req.decoded.id, function (err, result) {
        if (err) throw err
        else if (result) {
            AdminDeleteService(req.params.id, function (err, result) {
                if (err) {
                    throw err
                }
                else {
                    res.status(200).json({
                        error: false, data: result,
                        message: 'User has been deleted!'
                    })
                }
            })
        }
        else {
            res.status(403).json({ message: 'Authorization required!' })
        }
    })
}