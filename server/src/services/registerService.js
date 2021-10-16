const bcrypt = require('bcryptjs')
const User = require('../models/models')

async function registerUser(param, result) {

    const hashPass = await bcrypt.hash(param.password, 12);
    let params = {
        username: param.username,
        password: hashPass,
        fullname: param.fullname,
        email: param.email,
        role: "user"
    }
    User.create(params, function (err, user) {
        if (err) throw err;
        result(null, user);
    })
}
module.exports = registerUser