const express = require("express");
const { getBoardsByClass, addBoard } = require("../controllers/boardController");
const { authorizeRoles, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:classId", getBoardsByClass);
router.post("/:classId", authenticateUser, authorizeRoles("SUPERADMIN"), addBoard);

module.exports = router;
