require('dotenv').config(); //process.env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const getRoutes = require('./routes/getBlogs');
const followerRoutes = require('./routes/followerRoutes');
const { loginRequired, ensureCorrectUser } = require('./middlewares/auth');
const userInfo = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());

// body-parser extracts all the body content of an incoming
// request and exposes it on req.body
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', loginRequired, getRoutes);
app.use('/api/users/:id/blogs', loginRequired, ensureCorrectUser, blogRoutes);
app.use('/api/users/:id/profile', loginRequired, ensureCorrectUser, userInfo);
app.use(
  '/api/users/:id/:user_id',
  loginRequired,
  ensureCorrectUser,
  followerRoutes,
);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening at post ${PORT}`);
});
