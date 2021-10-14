const GetUserService = require('../services/getUserService')
const GetTokenService = require('../services/getTokenService')

exports.getUser = (req, res, next) => {
    // GetTokenService(req, function (err, decoded) {
    //     console.log(decoded +' nema');
    if (req.decoded) {
        GetUserService(req.decoded.id, function (err, result) {
            if (err) {
                throw err
            }
            else {
                console.log('milos');
                res.status(200).json({ message: 'Fetch successful!', data: result })
            }
        })
    }
    else {
        console.log('milo');
        res.status(422).json({ message: 'Please provide the token' })
    }
    // })
}