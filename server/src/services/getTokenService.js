const jwt = require('jsonwebtoken')

function getToken(param, result) {
    if (!param.headers.authorization ||
        !param.headers.authorization.startsWith('Bearer') ||
        !param.headers.authorization.split(' ')[1]) {
        console.log('ovde');
        result(null);
    }
    const token = param.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'the-super-strong-secret')

    result(decoded);

}
module.exports = getToken