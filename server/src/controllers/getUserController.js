const GetUserService = require('../services/getUserService')

exports.getUser = (req, res, next) => {
    GetUserService(req.body.id, function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.status(200).json({ data: result })
        }
    })
}