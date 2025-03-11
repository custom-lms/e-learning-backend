const express = require("express");
const { addBoard } = require("../controllers/boardController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const { getAllBoards } = require("../controllers/boardController");
const { getClassesByBoard } = require("../controllers/classController");
const router = express.Router();

// Only SUPERADMIN can add boards
router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addBoard);
router.get("/", getAllBoards);
router.get("/:boardId/classes", getClassesByBoard);

module.exports = router;
