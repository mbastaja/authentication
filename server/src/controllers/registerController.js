const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const conn = require('../db-config/database')
const User = require('../models/models')

exports.register = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        let qUser = conn.query(
            "select username from users where username=?",
            [req.body.username], async (err, result) => {
                if (err) throw err;
                else if (result[0]) {
                    return res.status(201).json({
                        message: `This username is already in use`,
                    })
                }
                else {
                    const hashPass = await bcrypt.hash(req.body.password, 12);
                    let params = {
                        username: req.body.username,
                        password: hashPass
                    }
                    User.register(params, function (err, user) {
                        if (err) res.send(err);
                        else res.status(201).json({ error: false, message: `The user has been added successfully!`, data: user })
                    })
                }
            })
    } catch (err) {
        next(err)
    }
}