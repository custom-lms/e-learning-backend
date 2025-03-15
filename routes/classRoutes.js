const express = require("express");
const { getClasses, addClass } = require("../controllers/classController");
const { authorizeRoles, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getClasses);
router.post("/", authenticateUser, authorizeRoles("SUPERADMIN"), addClass);

module.exports = router;
