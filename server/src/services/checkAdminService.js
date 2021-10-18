const User = require('../models/models');

function getById(id, result) {
    try {
        User.getAdminRole(id, function (err, role) {

            if (err) throw err;

            else if (role[0].role === "admin") {
                result(null, role)
            }
            else {
                result(err, null)
            }
        })
    }
    catch (e) {
        throw Error('Authentication required')
    }
}
module.exports = getById