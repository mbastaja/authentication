const GetUserService = require('../services/getUserService')

exports.getUsers = (req, res, next) => {
    GetUserService(function (err, result) {
        if (err) {
            throw err
        }
        else {
            console.log('controller');
            res.status(200).json({ error: false, data: result })
        }
    })
    // .then(users => res.json(users))
    // .catch(next)
    // return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });


}