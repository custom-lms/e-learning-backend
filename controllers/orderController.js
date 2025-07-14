const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Order
// exports.createOrder = async (req, res) => {
//   const {
//     classId,
//     boardId,
//     fullName,
//     mobile,
//     pincode,
//     school,
//     electiveIds,
//   } = req.body;

//   try {
//     const newOrder = await prisma.order.create({
//       data: {
//         classId,
//         boardId,
//         fullName,
//         mobile,
//         pincode,
//         school,
//         electiveIds,
//         status: 'PENDING',
//       },
//     });

//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// };


// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      pincode,
      school,
      electives,
      classId,
    } = req.body;

    // Convert array of electives to comma-separated string
    const electiveIds = electives.join(',');

    const newOrder = await prisma.order.create({
      data: {
        fullName,
        mobile,
        pincode,
        school,
        electiveIds, // ✅ use this
        classId,
        status: 'PENDING',
        paymentMode: null,
        razorpayPaymentId: null, // or leave undefined
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
};

// Update Order Status & Payment Mode
// exports.updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { status, paymentMode } = req.body;

//   try {
//     const updatedOrder = await prisma.order.update({
//       where: { id },
//       data: {
//         status,
//         paymentMode,
//       },
//     });

//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ error: 'Failed to update order' });
//   }
// };


// controllers/orderController.js
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, paymentMode } = req.body;

  console.log('Received order ID in params:', id); // ✅ log it to verify

  if (!id) {
    return res.status(400).json({ error: 'Order ID is missing in params' });
  }
  
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(id), // ✅ Ensure it's an integer
      },
      data: {
        status,
        paymentMode,
      },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};