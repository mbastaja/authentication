const User = require('../models/models')

function deleteById(id, result){
    try{
        User.delete(id, function(err, user){
            if (err) throw err
            result (null, user)
        })
    }
    catch (e){
        result(e, null)
    }
}
module.exports = deleteById