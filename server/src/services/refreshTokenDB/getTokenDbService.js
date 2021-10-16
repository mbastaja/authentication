const User = require('../../models/models')

function getTokenFromDb(id, result) {
    try {
        User.getToken(id, function (err, token) {
            if (err) throw err;
            result(null, token)
        })
    }
    catch (e) {
        throw Error('Error getting token from user by ID')
    }
}
module.exports = getTokenFromDb