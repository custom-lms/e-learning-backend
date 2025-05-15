const express = require("express");
const { addSubject, getSubjectsByBoard } = require("../controllers/subjectController");
const { authorizeRoles, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:boardId", getSubjectsByBoard);
router.post("/:boardId", authenticateUser, authorizeRoles("SUPERADMIN"), addSubject);

module.exports = router;
