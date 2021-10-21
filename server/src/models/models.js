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
    conn.query('update users set ? where id = ?', [updateUser, updateUser.id], function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res);
        }
    })
}
User.getUsers = (result) => {
    conn.query('select id, username, fullname, email, password, role from users', function (err, res, fields) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}
User.getUsername = (username, result) => {
    conn.query("select id, fullname, username, role, password from users where username=?",
        username, function (err, res, fields) {
            if (err) throw err;
            result(null, res);
        })
}
User.delete = (id, result) => {
    conn.query("delete from users where id = ?",
        id, function (err, res, fields) {
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
User.updateToken = function (params, result) {
    let userId = params.id
    let token = params.token
    conn.query('update users set refreshToken = ? where id = ?', [token, userId], function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res);
        }
    })
}
User.getToken = (id, result) => {
    conn.query(`select refreshToken from users where id=?`, id, function (err, res, fields) {
        if (err) throw err;
        result(null, res);
    })
}
module.exports = User
