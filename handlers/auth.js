const jwt = require('jsonwebtoken');
const connection = require('../models');
const bcrypt = require('bcrypt');


/*
     1.Extract email from body object. 
     2.Fetch user from database whose email matches.
       if didn't find any user then we'll send message
       to user like "please enter the correct email".
     3.then we match input password with stored password
     4.if password matched then we build token and then 
       send it to client side.
     5.other we'll send error message. 
*/
module.exports.signin = function (req, res, next) {
    let queryString = `SELECT * FROM users WHERE email='${req.body.email}'`;
    connection.query(queryString, async function (error, results, fields) {
        if (error) {
            next({
                status: 400,
                message: 'internal database error'
            });
        }
        else {
            if (results.length > 0) {
                let isMatch = await bcrypt.compare(req.body.password, results[0].password)
                if (isMatch) {
                    let token = jwt.sign({
                        id: results[0].id,
                        username: results[0].username,
                        profileImageUrl: results[0].profileImageUrl
                    }, process.env.SECRET_KEY);
                    res.status(200).json({
                        id: results[0].id,
                        username: results[0].username,
                        profileImageUrl: results[0].profileImageUrl,
                        token
                    });
                }
                else {
                    next({
                        status: 400,
                        message: 'enter correct password'
                    });
                }
            }
            else {
                next({
                    status: 400,
                    message: 'enter correct email'
                });
            }
        }
    })

}


/*
 
    1.Validate all the user inputs.
    2.Encrypt the password 
    3.Save user into the database 
    4.Make token and then send it to client 
      as a response

*/
module.exports.signup = async function (req, res, next) {
    if (!req.body.password || !req.body.username || !req.body.email) {
        return next({
            status: 401,
            message: 'all fields must be provided'
        });
    }
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        profileImageUrl: (!req.body.profileImageUrl) ? 'https://i.stack.imgur.com/34AD2.jpg' : req.body.profileImageUrl
    }
    connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
        if (error) {
            next({
                status: 400,
                message: error.message
            });
        }
        else {
            let id = results.insertId;
            connection.query(`SELECT id ,username,profileImageUrl FROM users WHERE id=${id}`, (error, results, fields) => {
                if (error) {
                    next(error);
                }
                else {
                    let { id, username, profileImageUrl } = results[0];
                    let token = jwt.sign({
                        id,
                        username,
                        profileImageUrl
                    }, process.env.SECRET_KEY);
                    res.status(200).json({
                        id,
                        username,
                        profileImageUrl,
                        token
                    });
                }
            });
        }
    });
}