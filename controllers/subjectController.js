const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch subjects for a given board
// exports.getSubjectsByBoard = async (req, res) => {
//   const { boardId } = req.params;

//   try {
//     const subjects = await prisma.subject.findMany({
//       where: { boardId: parseInt(boardId) },
//     });
//     res.status(200).json(subjects);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching subjects" });
//   }
// };

exports.getSubjectsByClassAndBoard = async (req, res) => {
  const { classId, boardId } = req.params;

  try {
    const board = await prisma.board.findFirst({
      where: {
        id: parseInt(boardId),
        classId: parseInt(classId),
      },
      include: {
        subjects: true, // this fetches the related subjects
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found for the specified class" });
    }

    res.status(200).json(board.subjects);
  } catch (error) {
    console.error(error);
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
