import Playlist from "../models/Playlist.js";

// ================= CREATE PLAYLIST =================
export const createPlaylist = async (req, res) => {
    try {

        const { name } = req.body;

        const playlist = await Playlist.create({
            name,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            playlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= GET MY PLAYLISTS =================
export const getMyPlaylists = async (req, res) => {
    try {

        const playlists = await Playlist.find({
            user: req.user._id,
        }).populate("videos");

        res.status(200).json({
            success: true,
            playlists,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= ADD VIDEO TO PLAYLIST =================
export const addVideoToPlaylist = async (req, res) => {

    try {

        const { playlistId, videoId } = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found",
            });
        }

        if (playlist.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const exists = playlist.videos.some(
            id => id.toString() === videoId
        );

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Video already exists",
            });
        }

        playlist.videos.push(videoId);

        await playlist.save();

        res.json({
            success: true,
            playlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};