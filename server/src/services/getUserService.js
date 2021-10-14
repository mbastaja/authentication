const User = require('../models/models');

function getById(id, result) {
    try {
        User.getUserById(id, function (err, user) {
            if (err) throw err;
            result(null, user)
        })
    }
    catch (e) {
        throw Error('Error getting specific user by ID')
    }
}
module.exports = getById