const express = require("express");
const { addChapter } = require("../controllers/chapterController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addChapter);

module.exports = router;