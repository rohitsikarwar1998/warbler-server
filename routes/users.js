const express = require('express');
const router = express.Router({ mergeParams: true });

const { getUserInfo, updateUser } = require('../handlers/users');

router
    .route('/')
    .get(getUserInfo)
    .post(updateUser);

module.exports = router;