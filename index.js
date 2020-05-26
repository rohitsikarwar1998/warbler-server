require('dotenv').config();  //process.env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const getRoutes = require('./routes/getBlogs');
const { loginRequired, ensureCorrectUser } = require('./middlewares/auth');


const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(bodyParser.json());



app.use('/api/auth', authRoutes);
app.use('/api/blogs',loginRequired,getRoutes);
app.use(
    '/api/users/:id/blogs',
    loginRequired,
    ensureCorrectUser,
    blogRoutes
);



app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server is listening at post ${PORT}`);
})