const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addChapter = async (req, res) => {
  const { name, subjectId } = req.body;

  if (!name || !subjectId) {
    return res.status(400).json({ message: "Chapter name and subjectId are required" });
  }

  try {
    const newChapter = await prisma.chapter.create({
      data: {
        name,
        subjectId,
      },
    });

    res.status(201).json({ message: "Chapter added successfully", chapter: newChapter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add chapter" });
  }
};


exports.getChaptersBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const chapters = await prisma.chapter.findMany({
      where: { subjectId },
    });

    if (!chapters.length) {
      return res.status(404).json({ message: "No chapters found for this subject" });
    }

    res.status(200).json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch chapters" });
  }
};
