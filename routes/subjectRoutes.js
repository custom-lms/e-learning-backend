const express = require("express");
const { addSubject, getSubjectsByClassAndBoard } = require("../controllers/subjectController");
const { authorizeRoles, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/:boardId", getSubjectsByBoard);
router.get("/:classId/boards/:boardId/subjects", getSubjectsByClassAndBoard);
router.post("/:boardId", authenticateUser, authorizeRoles("SUPERADMIN"), addSubject);

module.exports = router;
