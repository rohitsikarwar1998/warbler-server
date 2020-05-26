const express = require('express');
const router = express.Router({ mergeParams: true });
//allows us to excess the id in this router params

// const {  } = require('../handlers/messages');
const { createBlog, getBlog, deleteBlog } = require('../handlers/blogs');

router.route('/').post(createBlog);

router
    .route('/:blog_id')
    .get(getBlog)
    .delete(deleteBlog);

module.exports = router;
