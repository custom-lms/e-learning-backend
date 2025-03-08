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