const connection = require('../models/mysqlIndex');
const fetchQuery = require('./queryFetcher');

exports.createMessage = async function (req, res, next) {
    try {
        let newMessage = {
            text: req.body.text,
            user_id: req.params.id,
            created_at: new Date(),
            updated_at: new Date()
        }
        let query = 'INSERT INTO messages SET ?';
        let userQuery = `SELECT * FROM users WHERE id=${req.params.id}`;
        let results = await Promise.all([
            fetchQuery.fetchWithValues(query, connection, newMessage),
            fetchQuery.fetch(userQuery, connection)
        ]);

        let foundMessage = {
            id: results[0].insertId,
            text: req.body.text,
            user: {
                id: results[1][0].id,
                username: results[1][0].username,
                profileImageUrl: results[1][0].profileImageUrl
            }
        }

        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
}

// /api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
    try {
        let query = `SELECT * FROM messages WHERE id=${req.params.message_id}`;
        let foundMessage = await fetchQuery.fetch(query, connection);
        return res.status(200).json(foundMessage[0]);
    } catch (err) {
        return next(err);
    }
}
exports.deleteMessage = async function (req, res, next) {
    try {
        let queryDelete = `DELETE FROM messages WHERE id=${req.params.message_id}`;
        let queryFind = `SELECT * FROM messages WHERE id=${req.params.message_id}`;
        let foundMessage = await fetchQuery.fetch(queryFind, connection);
        await fetchQuery.fetch(queryDelete, connection);
        return res.status(200).json(foundMessage[0]);
    } catch (err) {
        return next(err);
    }
}

exports.getAllMessages = async function (req, res, next) {
    try {
        let query = `
            SELECT
                messages.id,
                text,
                updated_at,
                user_id,
                username,
                profileImageUrl 
            FROM
                users 
                JOIN
                messages 
                ON users.id = messages.user_id 
            ORDER BY
                messages.created_at DESC
        `;
        let results = await fetchQuery.fetch(query, connection);
        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
}