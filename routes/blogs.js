const express = require('express');
const router = express.Router({ mergeParams: true });
//allows us to excess the id in this router params

// const {  } = require('../handlers/messages');
const { createBlog, getBlog, deleteBlog,getSavedBlogs,getPublishedBlogs } = require('../handlers/blogs');
const { getComments, createComment, postLike
    , saveBlog, deleteLike, deleteSaveBlog,
    getLike, getSaveBlog } = require('../handlers/comments');

router.route('/').post(createBlog);

router
    .route('/saved')
    .get(getSavedBlogs);

router
    .route('/published')
    .get(getPublishedBlogs);

router
    .route('/:blog_id')
    .get(getBlog)
    .delete(deleteBlog);

router
    .route('/:blog_id/comments')
    .post(createComment)
    .get(getComments);

router
    .route('/:blog_id/likes')
    .get(getLike)
    .post(postLike)
    .delete(deleteLike);

router
    .route('/:blog_id/saved')
    .get(getSaveBlog)
    .post(saveBlog)
    .delete(deleteSaveBlog);


module.exports = router;
