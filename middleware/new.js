const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Ensure "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};