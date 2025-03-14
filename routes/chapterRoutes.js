const express = require("express");
const { addChapter } = require("../controllers/chapterController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const { getTopicsByChapter } = require("../controllers/topicController");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addChapter);
router.get("/:chapterId/topics", getTopicsByChapter);


module.exports = router;