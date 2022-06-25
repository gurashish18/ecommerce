const express = require('express');
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../Controller/UserController');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logoutUser);

module.exports = router