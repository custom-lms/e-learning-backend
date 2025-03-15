const express = require("express");
const { upload, uploadToS3 } = require("../utils/upload");
const {
  getTopicById,
  getTopicsByChapter,
  addTopic,
} = require("../controllers/topicController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all topics for a specific chapter
router.get("/:chapterId", getTopicsByChapter);

// Get topic details by ID
router.get("/topic/:topicId", getTopicById);

// Add a new topic with video & thumbnail upload
router.post(
  "/add-topic",
  authenticateUser,
  authorizeRoles("SUPERADMIN"),
  upload.fields([{ name: "video" }, { name: "thumbnail" }]),
  addTopic
);

module.exports = router;
