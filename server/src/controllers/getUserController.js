const GetUserService = require('../services/getUserService')

exports.getUser = (req, res, next) => {

    if (req.decoded) {
        GetUserService(req.decoded.id, function (err, result) {
            if (err) {
                throw err
            }
            else {
                res.status(200).json({ message: 'Fetch successful!', data: result })
            }
        })
    }
    else {
        res.status(422).json({ message: 'Please provide the token' })
    }
}