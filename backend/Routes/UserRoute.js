const express = require('express');
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require('../Controller/UserController');
const { isAuthenticatedUser, authoriseRoles } = require('../middlewares/Auth');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logoutUser);
router.route('/user').get(isAuthenticatedUser, getUserDetails);
router.route('/user/changepassword').put(isAuthenticatedUser, changePassword);
router.route('/user/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, authoriseRoles("admin"), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authoriseRoles("admin"), getSingleUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authoriseRoles("admin"), updateRole);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authoriseRoles("admin"), deleteUser);

module.exports = router