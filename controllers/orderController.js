const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Order
exports.createOrder = async (req, res) => {
  const {
    classId,
    boardId,
    fullName,
    mobile,
    pincode,
    school,
    electiveIds,
  } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        classId,
        boardId,
        fullName,
        mobile,
        pincode,
        school,
        electiveIds,
        status: 'PENDING',
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update Order Status & Payment Mode
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, paymentMode } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
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
