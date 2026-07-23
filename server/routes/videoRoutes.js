import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    getVideos,
    getVideoById,
    getMyVideos,
    deleteVideo,
    addVideo,
    likeVideo,
    addComment,
    updateVideo,
    incrementViews,
    getChannelVideos,
    getDashboard,
    getRelatedVideos,
    increaseView,
    getDashboardStats,
} from "../controllers/videoController.js";

const router = express.Router();

// ================= GET ALL VIDEOS =================
router.get("/", getVideos);


// ================= GET RELATED VIDEOS =================
router.get("/related/:id", getRelatedVideos);

// ================= INCREASE VIEW COUNT =================
router.put(
    "/view/:id",
    increaseView
);

// ================= GET DASHBOARD =================
router.get(
    "/dashboard",
    protect,
    getDashboard
);
router.get("/myvideos", protect, getMyVideos);

router.get("/channel/:userId", getChannelVideos);

// ================= GET SINGLE VIDEO =================
router.get("/:id", getVideoById);

// ================= UPDATE VIDEO =================
router.put(
    "/:id",
    protect,
    updateVideo
);

// ================= UPLOAD VIDEO =================
router.post("/", protect, addVideo);

// ================= UPDATE VIDEO =================
router.put("/:id", protect, updateVideo);

// ================= LIKE VIDEO =================
router.put("/:id/like", protect, likeVideo);


router.put("/:id/view", incrementViews);


// ================= ADD COMMENT =================
router.post("/:id/comment", protect, addComment);

router.delete("/:id", protect, deleteVideo);

//================= DASHBOARD STATS =================
router.get(
    "/dashboard/stats",
    protect,
    getDashboardStats
);


export default router;