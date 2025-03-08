const express = require("express");
const { addBoard } = require("../controllers/boardController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Only SUPERADMIN can add boards
router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addBoard);

module.exports = router;