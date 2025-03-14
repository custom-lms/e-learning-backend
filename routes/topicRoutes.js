const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { upload, uploadToS3 } = require("../utils/upload");

const prisma = new PrismaClient();
const router = express.Router();

const { getTopicById } = require("../controllers/topicController");

// Upload video and thumbnail along with topic details
router.post(
  "/add-topic",
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  async (req, res) => {
    try {
      const { name, description, chapterId } = req.body;

      if (!req.files || !req.files.video || !req.files.thumbnail) {
        return res.status(400).json({ error: "Video and Thumbnail are required" });
      }

      const videoUrl = await uploadToS3(req.files.video[0], "videos");
      const thumbnailUrl = await uploadToS3(req.files.thumbnail[0], "thumbnails");

      const topic = await prisma.topic.create({
        data: {
          name,
          description,
          videoUrl,
          thumbnailUrl,
          chapterId,
        },
      });

      res.status(201).json({ message: "Topic created successfully", topic });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/:topicId", getTopicById);

module.exports = router;
