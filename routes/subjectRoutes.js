const express = require("express");
const { addSubject } = require("../controllers/subjectController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticateUser, authorizeRoles("SUPERADMIN"), addSubject);

module.exports = router;