const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTopicsByChapter = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const topics = await prisma.topic.findMany({
      where: { chapterId },
    });

    if (!topics.length) {
      return res.status(404).json({ message: "No topics found for this chapter" });
    }

    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};

exports.getTopicById = async (req, res) => {
    const { topicId } = req.params;
  
    try {
      const topic = await prisma.topic.findUnique({
        where: { id: topicId },
      });
  
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
  
      res.status(200).json(topic);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch topic details" });
    }
  };
