const User = require('../models/models');

module.exports = getAll

function getAll(result) {
    try {
        User.getUsers(function (err, res) {
            if (err) throw err;
            console.log('service');
            result(null, res)
        })
    }
    catch (e) {
        throw Error('Error')
    }
}
module.exports = getAll