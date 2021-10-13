const User = require('../models/models')

function checkUsername(param, result) {
    try {
        User.getUsername(param, function (err, user) {
            if (err) throw err;
            result(null, user);
        })
    }
    catch (e) {
        throw Error('Error')
    }
}
module.exports = checkUsername
