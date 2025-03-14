const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const { addSubject } = require("../controllers/subjectController");
const { getChaptersBySubject } = require("../controllers/chapterController");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addSubject);
router.get("/:subjectId/chapters", getChaptersBySubject);

module.exports = router;