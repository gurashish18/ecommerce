const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../Controller/ProductController');
const { isAuthenticatedUser, authoriseRoles } = require('../middlewares/Auth');
const router = express.Router();


router.route('/products').get(getAllProducts)
// suppose we want to create a product only when user is authenticated
router.route('/product/new').post(isAuthenticatedUser,authoriseRoles("admin"), createProduct)
router.route('/product/:id').put(isAuthenticatedUser,authoriseRoles("admin"), updateProduct)
router.route('/product/:id').delete(isAuthenticatedUser,authoriseRoles("admin"), deleteProduct)
router.route('/product/:id').get(getProductDetails)

module.exports = router