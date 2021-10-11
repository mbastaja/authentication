'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: '309j122.e2.mars-hosting.com',
    port: '3306',
    user: 'praksa@309j122',
    password: 'praksa123',
    database: '309j122'
});

dbConn.connect(function(err){
    if (err) throw err;
    console.log("Database Connected!");
    
})

module.exports = dbConn;