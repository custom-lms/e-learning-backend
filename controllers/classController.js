const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes" });
  }
};

// Add a class (SUPERADMIN only)
exports.addClass = async (req, res) => {
  const { name } = req.body;

  try {
    const newClass = await prisma.class.create({ data: { name } });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error adding class" });
  }
};
