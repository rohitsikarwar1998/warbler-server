const express = require('express');
const router = express.Router({ mergeParams: true });

const {getAllMessages} =require('../handlers/mysqlMessages');

router
    .get('/',getAllMessages);

module.exports = router;