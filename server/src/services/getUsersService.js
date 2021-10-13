const User = require('../models/models');

function getAll(result) {
    try {
        User.getUsers(function (err, res) {
            if (err) throw err;
            result(null, res)
        })
    }
    catch (e) {
        throw Error('Error listing all users')
    }
}
module.exports = getAll