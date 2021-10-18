const jwt = require('jsonwebtoken')

async function decodeTokenFromRequest(req, res, next) {

    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return next()
    }
    
    const token = req.headers.authorization.split(' ')[1];
    
    try{
        const decoded = jwt.verify(token, 'the-super-strong-secret')
        req.decoded = decoded
        next()
    }
    catch(err){
        throw Error('Expired user token, please login.')
    }

}

module.exports = decodeTokenFromRequest



module.exports = decodeTokenFromRequest