// const prisma = require("../prisma/client");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.status(200).json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch boards" });
  }
};

exports.addBoard = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    // Check if the board already exists
    const existingBoard = await prisma.board.findUnique({
      where: { name },
    });

    if (existingBoard) {
      return res.status(400).json({ message: "Board already exists" });
    }

    // Insert new board
    const newBoard = await prisma.board.create({
      data: { name },
    });

    res.status(201).json({ message: "Board added successfully", board: newBoard });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};