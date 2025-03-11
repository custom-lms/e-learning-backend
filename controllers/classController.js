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

exports.getClassesByBoard = async (req, res) => {
  const { boardId } = req.params;
  console.log('Board Id received', boardId);
  try {
    const classes = await prisma.class.findMany({
      where: { boardId },
    });
    console.log('Classes found', classes);

    if (!classes.length) {
      return res.status(404).json({ message: "No classes found for this board" });
    }

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};