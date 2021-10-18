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
User.update = function (updateUser, result) {
    console.log(JSON.stringify(updateUser) + "ovde");
    conn.query('update users set ? where id = ?', [updateUser, updateUser.id], function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            console.log(res);
            result(null, res);
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
User.getEmail = (email, result) => {
    conn.query("select * from users where email=?",
        email, function (err, res, fields) {
            if (err) throw err;
            result(null, res);
        })
}
User.getUserById = (id, result) => {
    conn.query(`select id, fullname, username, email, password from users where id=?`, id, function (err, res, fields) {
        if (err) throw err;
        result(null, res);
    })
}
User.getAdminRole = (id, result) => {
    conn.query(`select role from users where id=?`, id, function (err, res, fields) {
        if (err) throw err;
        result(null, res);
    })
}
module.exports = User
