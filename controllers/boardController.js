const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all boards for a given class
exports.getBoardsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const boards = await prisma.board.findMany({
      where: { classId: parseInt(classId) },
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boards" });
  }
};

// Add a board (SUPERADMIN only)
exports.addBoard = async (req, res) => {
  const { name } = req.body;
  const { classId } = req.params;

  try {
    const newBoard = await prisma.board.create({
      data: { name, classId: parseInt(classId) },
    });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: "Error adding board" });
  }
};
