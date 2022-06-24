const express = require('express');
const { createUser, loginUser, logoutUser } = require('../Controller/UserController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router