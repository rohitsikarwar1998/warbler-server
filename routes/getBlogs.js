const express = require('express');
const router = express.Router({ mergeParams: true });

const {getAllBlogs} =require('../handlers/blogs');

router
    .get('/',getAllBlogs);

module.exports = router;