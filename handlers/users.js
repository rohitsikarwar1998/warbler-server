const connection = require('../models');
const fetchQuery = require('./queryFetcher');

exports.getUserInfo = async function (req, res, next) {
  try {
    let query = `select name,username,profileImageUrl as imageUrl,
                            email,shortBio
                     from users
                     where id=${req.params.id}`;
    let foundUser = await fetchQuery.fetch(query, connection);
    return res.status(200).json(foundUser[0]);
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    let query = `update users
                     set name='${req.body.name}',username='${req.body.username}',
                         profileImageUrl="${req.body.imageUrl}",shortbio="${req.body.shortBio}"
                     where id=${req.params.id}`;
    let foundUser = await fetchQuery.fetch(query, connection);
    return res.status(200).json(foundUser);
  } catch (err) {
    return next(err);
  }
};
