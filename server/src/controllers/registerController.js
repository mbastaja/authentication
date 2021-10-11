const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const conn = require('../db-config/database').promise()

exports.register = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const [row] = await conn.execute(
            "select username from users where username=?",
            [req.body.username])

    if (row.length > 0) {
        return res.status(201).json({
            message: "The Username is already in use",
        })
    }
    const hashPass = await bcrypt.hash(req.body.password, 12);

    const [rows] = await conn.execute('insert into users (username, password) VALUES(?,?)',[
        req.body.username,
        hashPass
    ])
    
    if(rows.affectedRows === 1) {
        return res.status(201).json({ 
            message: "The user has been added successfully!",
        })
    }
    
    } catch(err){
        next(err)
    }
}