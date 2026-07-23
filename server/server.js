import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import path from "path";
import playlistRoutes from "./routes/playlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";



dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/playlists", playlistRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 StreamMind AI Backend Running Successfully",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});