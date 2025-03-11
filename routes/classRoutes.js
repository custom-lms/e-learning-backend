const express = require("express");
const { addClass } = require("../controllers/classController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const { getSubjectsByClass } = require("../controllers/subjectController");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addClass);
router.get("/:classId/subjects", getSubjectsByClass);

module.exports = router;