const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addClass = async (req, res) => {
  const { name, boardId } = req.body;

  if (!name || !boardId) {
    return res.status(400).json({ message: "Class name and boardId are required" });
  }

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
        boardId,
      },
    });

    res.status(201).json({ message: "Class added successfully", class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add class" });
  }
};