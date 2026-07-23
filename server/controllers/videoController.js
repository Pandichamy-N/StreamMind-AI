import Video from "../models/Video.js";
import User from "../models/User.js";

// ================= GET ALL VIDEOS =================
export const getVideos = async (req, res) => {
    try {

        const keyword = req.query.search
            ? {
                title: {
                    $regex: req.query.search,
                    $options: "i",
                },
            }
            : {};

        const videos = await Video.find(keyword).populate(
            "user",
            "name email subscribers"
        );

        res.status(200).json(videos);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= GET SINGLE VIDEO =================
export const getVideoById = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id).populate(
            "user",
            "name email subscribers"
        );

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        res.status(200).json(video);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= ADD VIDEO =================
export const addVideo = async (req, res) => {
    try {

        const {
            title,
            channel,
            thumbnail,
            videoUrl,
            time,
            duration,
            category,
        } = req.body;

        const newVideo = new Video({
            user: req.user._id,
            title,
            channel,
            thumbnail,
            videoUrl,
            views: 0,
            likes: 0,
            time,
            duration,
            category,
        });

        await newVideo.save();

        res.status(201).json({
            success: true,
            message: "Video Uploaded Successfully",
            video: newVideo,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= LIKE VIDEO =================
export const likeVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        video.likes += 1;

        await video.save();

        res.status(200).json(video);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= ADD COMMENT =================
export const addComment = async (req, res) => {
    try {

        const { username, text } = req.body;

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        video.comments.push({
            username,
            text,
        });

        await video.save();

        res.status(200).json(video);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// ================= MY UPLOADS =================
export const getMyVideos = async (req, res) => {
    try {

        const videos = await Video.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            videos,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= DELETE VIDEO =================
export const deleteVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await Video.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Video deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ================= INCREMENT VIEWS =================
export const incrementViews = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        const currentViews = parseInt(video.views) || 0;

        video.views = currentViews + 1;

        await video.save();

        res.status(200).json({
            success: true,
            views: video.views,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= CHANNEL VIDEOS =================
export const getChannelVideos = async (req, res) => {
    try {

        const videos = await Video.find({
            user: req.params.userId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            videos,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ================= CREATOR DASHBOARD =================

export const getDashboard = async (req, res) => {

    try {

        const videos = await Video.find({
            user: req.user._id
        });

        const totalVideos = videos.length;

        const totalLikes = videos.reduce(
            (sum, video) => sum + (video.likes || 0),
            0
        );

        const totalViews = videos.reduce(
            (sum, video) => sum + (Number(video.views) || 0),
            0
        );

        const user = await User.findById(req.user._id);

        const subscribers =
            user?.subscribers?.length || 0;

        res.json({
            success: true,
            totalVideos,
            totalLikes,
            totalViews,
            subscribers,
            videos,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ================= RELATED VIDEOS =================

export const getRelatedVideos = async (req, res) => {

    try {

        const { id } = req.params;

        const currentVideo = await Video.findById(id);

        if (!currentVideo) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        const relatedVideos = await Video.find({
            _id: { $ne: id },
        })
            .limit(8);

        res.json(relatedVideos);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ================= INCREASE VIEW =================
export const increaseView = async (req, res) => {

    try {

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        video.views = (parseInt(video.views) || 0) + 1;

        await video.save();

        res.json({
            success: true,
            views: video.views,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ================= update VIDEO =================
export const updateVideo = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            category,
            duration,
            time,
            videoUrl,
        } = req.body;

        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }


        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        video.title = title;
        video.category = category;
        video.duration = duration;
        video.time = time;

        if (videoUrl && videoUrl !== video.videoUrl) {

            let videoId = "";

            if (videoUrl.includes("youtu.be/")) {
                videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
            } else if (videoUrl.includes("watch?v=")) {
                videoId = videoUrl.split("v=")[1].split("&")[0];
            }

            video.videoUrl = videoUrl;
            video.videoId = videoId;
            video.thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        }
        await video.save();

        res.json({
            success: true,
            video,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getDashboardStats = async (req, res) => {

    try {

        const videos = await Video.find({
            user: req.user._id,
        });

        const totalVideos = videos.length;

        const totalViews = videos.reduce(
            (sum, video) => sum + (video.views || 0),
            0
        );

        const totalLikes = videos.reduce(
            (sum, video) => sum + (video.likes || 0),
            0
        );

        const totalComments = videos.reduce(
            (sum, video) => sum + (video.comments?.length || 0),
            0
        );

        res.json({
            totalVideos,
            totalViews,
            totalLikes,
            totalComments,
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};