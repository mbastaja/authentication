const User = require('../../models/models')

function insertTokenInDb(param, result) {

    let params = {
        id: param.id,
        token: param.token
    }
    User.updateToken(params, function (err, user) {
        if (err) throw err
        if(user){
            result(null, user)
        }
        else{
            result(err, null)
        }
    })

}
module.exports = insertTokenInDb