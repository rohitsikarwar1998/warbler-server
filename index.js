require('dotenv').config();  //process.env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middlewares/auth');

const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messageRoutes
);

app.get('/api/messages', loginRequired, async function (req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: "desc" })
            .populate("user", {
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(messages);
    } catch (err) {
        return next();
    }
});

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server is listening at post ${PORT}`);
})