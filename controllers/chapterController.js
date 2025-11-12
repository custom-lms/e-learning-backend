const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch chapters for a given subject
exports.getChaptersBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const chapters = await prisma.chapter.findMany({
      where: { subjectId: subjectId },
      include: {
        topics: true, // 👈 Include all related topics
      },
    });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapters" });
  }
};

// Add a chapter (SUPERADMIN only)
exports.addChapter = async (req, res) => {
  const { name } = req.body;
  const { subjectId } = req.params;

  try {
    const newChapter = await prisma.chapter.create({
      data: { name, subjectId },
    });
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: "Error adding chapter" });
  }
};