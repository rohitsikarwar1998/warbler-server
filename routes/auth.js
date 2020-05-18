const express = require('express');
const router = express.Router();

// const { signup, signin } = require('../handlers/auth');
const register = require('../handlers/mysqlAuth');



router.post("/signup", register.signup);
router.post("/signin", register.signin);

module.exports = router;