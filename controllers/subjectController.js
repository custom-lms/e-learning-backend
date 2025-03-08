const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addSubject = async (req, res) => {
  const { name, classId, language } = req.body;

  if (!name || !classId || !language) {
    return res.status(400).json({ message: "Subject name, classId, and language are required" });
  }

  if (!["Assamese", "English"].includes(language)) {
    return res.status(400).json({ message: "Invalid language. Must be 'Assamese' or 'English'." });
  }

  try {
    const newSubject = await prisma.subject.create({
      data: {
        name,
        classId,
        language,
      },
    });

    res.status(201).json({ message: "Subject added successfully", subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add subject" });
  }
};