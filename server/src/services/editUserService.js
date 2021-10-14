const bcrypt = require('bcryptjs')
const User = require('../models/models')

async function editUser(param, result) {

    const hashPass = await bcrypt.hash(param.body.password, 12);

    let params = {
        username: param.body.username,
        password: hashPass,
        fullname: param.body.fullname,
        email: param.body.email,
        id: param.decoded.id
    }
    console.log(params);
    User.update(params, function (err, user) {
        console.log('user.update');
        if (err) throw err
        if(user){
            console.log('if user');
            result(null, user)
        }
        else{
            console.log('else');
            result(err, null)
        }
    })

}
module.exports = editUser