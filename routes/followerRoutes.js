const express = require('express');
const router = express.Router({ mergeParams: true });

const {follows, unfollows,getfollow} =require('../handlers/followers');

router.route('/')
          .get(getfollow)
          .post(follows)
          .delete(unfollows);


module.exports=router;