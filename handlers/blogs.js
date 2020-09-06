const connection = require('../models');
const fetchQuery = require('./queryFetcher');

exports.createBlog = async function (req, res, next) {
    try {
        let newBlog = {
            text: req.body.text,
            user_id: req.params.id,
            created_at: new Date(),
            updated_at: new Date()
        }
        let query = 'INSERT INTO blogs SET ?';
        let userQuery = `SELECT * FROM users WHERE id=${req.params.id}`;
        let results = await Promise.all([
            fetchQuery.fetchWithValues(query, connection, newBlog),
            fetchQuery.fetch(userQuery, connection)
        ]);

        let foundBlog = {
            id: results[0].insertId,
            text: req.body.text,
            user: {
                id: results[1][0].id,
                username: results[1][0].username,
                profileImageUrl: results[1][0].profileImageUrl
            }
        }

        return res.status(200).json(foundBlog);
    } catch (err) {
        return next(err);
    }
}

// /api/users/:id/messages/:message_id
exports.getBlog = async function (req, res, next) {
    try {
        let query = `SELECT b.*,u.username,u.profileImageUrl 
                     FROM blogs b inner join users u on b.user_id=u.id 
                     WHERE b.id=${req.params.blog_id}`;
        let foundMessage = await fetchQuery.fetch(query, connection);
        return res.status(200).json(foundMessage[0]);
    } catch (err) {
        return next(err);
    }
}
exports.deleteBlog = async function (req, res, next) {
    try {
        let queryDelete = `DELETE FROM blogs WHERE id=${req.params.blog_id}`;
        let queryFind = `SELECT * FROM blogs WHERE id=${req.params.blog_id}`;
        let foundMessage = await fetchQuery.fetch(queryFind, connection);
        await fetchQuery.fetch(queryDelete, connection);
        return res.status(200).json(foundMessage[0]);
    } catch (err) {
        return next(err);
    }
}

exports.getAllBlogs = async function (req, res, next) {
    try {
        let query = `
            SELECT
                blogs.id,
                text,
                updated_at,
                user_id,
                username,
                profileImageUrl 
            FROM
                users 
                JOIN
                blogs 
                ON users.id = blogs.user_id 
            ORDER BY
                blogs.created_at DESC
        `;
        let results = await fetchQuery.fetch(query, connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}

exports.getSavedBlogs = async function (req, res, next) {
    try {
        let query = `
            select temp.*,u.username,u.profileImageUrl
            from 
                (select b.* ,s.saved_at,s.user_id as cur_user_id from savedBlogs s 
                inner join blogs b
                on s.blog_id=b.id) temp
            inner join users u on u.id=temp.cur_user_id
            where u.id=${req.params.id};
        `;
        let results = await fetchQuery.fetch(query, connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}
exports.getPublishedBlogs = async function (req, res, next) {
    try {
        let query = `
            select b.*,u.username,u.profileImageUrl
            from blogs b
            inner join users u on b.user_id=u.id
            where u.id=${req.params.id};
        `;
        let results = await fetchQuery.fetch(query, connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}

