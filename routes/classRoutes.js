const express = require("express");
const { addClass } = require("../controllers/classController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addClass);

module.exports = router;