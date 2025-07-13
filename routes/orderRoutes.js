const express = require('express');
const router = express.Router();
const { createOrder, updateOrder } = require('../controllers/orderController');

// POST /api/orders
router.post('/', createOrder);

// PATCH /api/orders/:id
router.patch('/:id', updateOrder);

module.exports = router;
