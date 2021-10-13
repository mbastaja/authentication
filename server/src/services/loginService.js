const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { loginValidation } = require('../../validation')
const User = require('../models/models')

function loginUser(param, result) {
    let hash = '';
    let userId = '';
    let token = '';
    try {
        User.getUsername(param.username, function (err, user) {
            if (err) throw err;
            // result(null, user)
            hash = user[0].password
            userId = user[0].id
            // console.log(param.password);
            let compare = bcrypt.compare(param.password, hash, (bErr, bResult) => {
                if (bResult) {
                    let payload = { "id": userId }
                    token = jwt.sign(payload, 'the-super-strong-secret', { expiresIn: '2h' })
                    // console.log(hash);
                    // console.log(param.password);
                    console.log(token);
                    result(null, token)
                }
                else {
                    result(bErr, null)
                    // throw bErr;
                }
            })
        })
    }
    catch (e) {
        throw Error('Error')
    }
    // return token;
}
module.exports = loginUser