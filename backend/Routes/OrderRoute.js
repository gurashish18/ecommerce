const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../Controller/OrderController");
const { isAuthenticatedUser, authoriseRoles } = require("../middlewares/Auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatedUser, getUserOrders);
router
  .route("/admin/allorders")
  .get(isAuthenticatedUser, authoriseRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateOrderStatus);
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteOrder);

module.exports = router;
