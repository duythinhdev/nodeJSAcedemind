const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CheckAuth = require('../../middleware/check-auth');
const  OrderController  = require("../../controllers/order");
// handle incomming get requests to /orders
router.get('/',CheckAuth, OrderController.orders_get_all)
router.post('/', CheckAuth,OrderController.orders_create)
router.get('/:orderId',CheckAuth,OrderController.order_get_by_id)
router.delete('/:orderId',CheckAuth,OrderController.order_get_by_id)

module.exports = router;
