const express = require("express");
const { getChaptersBySubject, addChapter } = require("../controllers/chapterController");
const { authorizeRoles, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:subjectId", getChaptersBySubject);
router.post("/:subjectId", authenticateUser, authorizeRoles("SUPERADMIN"), addChapter);

module.exports = router;