const { PrismaClient } = require("@prisma/client");
const { uploadToS3 } = require("../utils/upload");
const prisma = new PrismaClient();

exports.getTopicsByChapter = async (req, res) => {
  const { chapterId } = req.params;

  console.log("CHAPPPP", chapterId)

  try {
    // Ensure chapterId is correctly parsed (if it's an integer in the schema)
    const topics = await prisma.topic.findMany({
      where: { chapterId: chapterId },
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

exports.addTopic = async (req, res) => {
  try {
    const { name, description, chapterId } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ error: "Video and Thumbnail are required" });
    }

    // Upload files to S3
    const videoUrl = await uploadToS3(req.files.video[0], "videos");
    const thumbnailUrl = await uploadToS3(req.files.thumbnail[0], "thumbnails");

    // Ensure chapterId is correctly formatted
    const topic = await prisma.topic.create({
      data: {
        name,
        description,
        videoUrl,
        thumbnailUrl,
        chapterId: chapterId, // Ensure it's stored correctly
      },
    });

    res.status(201).json({ message: "Topic created successfully", topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
