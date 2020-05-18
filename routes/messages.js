const express = require('express');
const router = express.Router({ mergeParams: true });
//allows us to excess the id in this router params

// const {  } = require('../handlers/messages');
const { createMessage, getMessage, deleteMessage } = require('../handlers/mysqlMessages');

router.route('/').post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;
