const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes"); // Import board routes
const classRoutes = require("./routes/classRoutes"); // Add this
const subjectRoutes = require("./routes/subjectRoutes"); // Add this
const chapterRoutes = require("./routes/chapterRoutes"); // Add this
const topicRoutes = require("./routes/topicRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes); // Register board routes
app.use("/api/classes", classRoutes); // Add this
app.use("/api/subjects", subjectRoutes); // Add this
app.use("/api/chapters", chapterRoutes); // Add this
app.use("/api/topics", topicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));