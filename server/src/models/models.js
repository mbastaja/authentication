'use strict';
const conn = require('../db-config/database')

let User = function (user) {
    this.username = user.username;
    this.password = user.password;
}

User.register = function (newUser, result) {
    conn.query('insert into users set ?', newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null)
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
}
module.exports = User