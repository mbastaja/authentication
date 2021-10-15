'use strict';
const conn = require('../db-config/database')

let User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.fullname = user.fullname;
    this.email = user.email;
}

User.create = function (newUser, result) {
    conn.query('insert into users set ?', newUser, function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res.insertId);
        }
    })
}
User.getUsers = (result) => {
    conn.query('select * from users', function (err, res, fields) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}
User.getUsername = (username, result) => {
    conn.query("select * from users where username=?",
        username, function (err, res, fields) {
            if (err) throw err;
            result(null, res);
        })
}
User.getUserById = (id, result) => {
    conn.query(`select fullname, username, email, password from users where id=?`, id, function (err, res, fields) {
        if (err) throw err;
        result(null, res);
    })
}
module.exports = User
