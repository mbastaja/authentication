const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/models')
const InsertTokenDbService = require('../services/refreshTokenDB/insertTokenDbService')

function loginUser(param, result) {
    let hash = '';
    let userId = '';
    try {
        User.getUsername(param.username, function (err, user) {
            if (err) throw err;
            hash = user[0].password
            userId = user[0].id
            let compare = bcrypt.compare(param.password, hash, (bErr, bResult) => {
                if (bResult) {
                    let payload = { "id": userId }
                    let tokens = {
                        accessToken: '',
                        refreshToken: '',
                    }
                    tokens.accessToken = jwt.sign(payload, 'the-super-strong-secret', { expiresIn: '2h' })
                    tokens.refreshToken = jwt.sign(payload, 'some-secret-refresh-token-stuff', { expiresIn: '24h' })

                    let params = {
                        id: userId,
                        token: tokens.refreshToken
                    }

                    InsertTokenDbService(params, function (err, res) {
                        if (err) throw err

                    })

                    result(null, tokens)


                }
                else {
                    result(bErr, null)
                }
            })
        })
    }
    catch (e) {
        throw Error('Error')
    }
}
module.exports = loginUser