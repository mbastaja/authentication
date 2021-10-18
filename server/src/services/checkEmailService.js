const User = require('../models/models')

function checkEmail(param, result) {
    try {
        User.getEmail(param, function (err, user) {
            if (err) throw err;
            result(null, user);
        })
    }
    catch (e) {
        throw Error('Error')
    }
}
module.exports = checkEmail
