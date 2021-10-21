const jwt = require('jsonwebtoken')
const GetTokenDbService = require('../services/refreshTokenDB/getTokenDbService')

async function decodeTokenFromRequest(req, res, next) {

    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return next()
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'the-super-strong-secret', function (err, decoded) {
            if (err) {
                const payload = jwt.verify(token, 'the-super-strong-secret', { ignoreExpiration: true })
                let userId = payload.id
                GetTokenDbService(userId, function (err, refreshToken) {

                    if (err) {
                        return res.status(401).json({ success: false, message: 'No refresh token in database, please login.' })

                    }
                    else {

                        jwt.verify(refreshToken[0].refreshToken, 'some-secret-refresh-token-stuff', function (error, valid) {

                            if (error) {
                                return res.status(401).json({ success: false, message: 'Refresh token expired, please login.' })

                            }
                            else {
                                let payload = { "id": userId }

                                let accessToken = jwt.sign(payload, 'the-super-strong-secret', { expiresIn: '2h' })


                                jwt.verify(accessToken, 'the-super-strong-secret', function (err, decoded) {
                                    req.decoded = decoded
                                    res.decoded = decoded
                                    res.tokens = JSON.stringify(accessToken)
                                    next()
                                })

                            }
                        })
                    }

                })
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }

}

module.exports = decodeTokenFromRequest