const express = require('express');
const router = express.Router();
const { createOrder, updateOrder, getUserOrders } = require('../controllers/orderController');

// POST /api/orders
router.post('/', createOrder);

// PATCH /api/orders/:id
router.patch('/:id', updateOrder);

// Use the controller here
router.get("/user/:email", getUserOrders);

module.exports = router;
