import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    createPlaylist,
    getMyPlaylists,
    addVideoToPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/", protect, createPlaylist);

router.get("/", protect, getMyPlaylists);

router.put(
    "/:playlistId/:videoId",
    protect,
    addVideoToPlaylist
);

export default router;