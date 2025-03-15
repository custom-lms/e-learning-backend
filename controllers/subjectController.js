const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch subjects for a given board
exports.getSubjectsByBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    const subjects = await prisma.subject.findMany({
      where: { boardId: parseInt(boardId) },
    });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

// Add a subject (SUPERADMIN only)
exports.addSubject = async (req, res) => {
  const { name, language } = req.body;
  const { boardId } = req.params;

  try {
    const newSubject = await prisma.subject.create({
      data: { name, language, boardId: parseInt(boardId) },
    });
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: "Error adding subject" });
  }
};
