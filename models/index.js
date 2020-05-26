const mysql = require('mysql');

// =========

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'warbler',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) console.log(err.message);
    else console.log('connection is successful');
});

module.exports = connection;

// const { userTable } = require('./mysqlUser');

// connection.query(userTable, (err, results, fields) => {
//     if (err) console.log(err.message);
//     else {
//         console.log(results + "  " + fields);
//     }
//     connection.end();
// })


//==========