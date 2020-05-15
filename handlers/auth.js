const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
    //finding user
    //check if there password matches or not 
    //if if all matches
    //log them in and set cookies and session in the browser
    //but in our case send json web token
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email/Password'
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid Email/Password'
        });
    }
}

exports.signup = async function (req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);

        let { id, username, profileImageUrl } = user;

        //create a token(signing a token)
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);
        //process.env.SECRET_KEY

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        //see what kind of error
        //otherwise just send back generic 400

        if (err.code === 11000) {
            err.message = "sorry,that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}
