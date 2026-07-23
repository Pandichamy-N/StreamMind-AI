import User from "../models/User.js";

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                watchLaterCount: user.watchLater.length,
                historyCount: user.history.length,
                subscriptionsCount: user.subscriptions.length,
                subscribersCount: user.subscribers.length,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// ================= GET WATCH LATER =================
export const getWatchLater = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("watchLater");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            watchLater: user.watchLater,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= ADD TO WATCH LATER =================
export const addToWatchLater = async (req, res) => {
    try {
        const { videoId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const exists = user.watchLater.some(
            (id) => id.toString() === videoId
        );

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Video already in Watch Later",
            });
        }

        user.watchLater.push(videoId);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Added to Watch Later",
            watchLater: user.watchLater,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= REMOVE FROM WATCH LATER =================
export const removeFromWatchLater = async (req, res) => {
    try {
        const { videoId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.watchLater = user.watchLater.filter(
            (id) => id.toString() !== videoId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Removed from Watch Later",
            watchLater: user.watchLater,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= ADD TO HISTORY =================
export const addToHistory = async (req, res) => {
    try {
        const { videoId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.history = user.history.filter(
            (id) => id.toString() !== videoId
        );

        user.history.unshift(videoId);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Added to History",
            history: user.history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= GET HISTORY =================
export const getHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("history");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            history: user.history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= SUBSCRIBE =================
export const subscribeChannel = async (req, res) => {
    try {
        const { channelId } = req.params;

        if (req.user._id.toString() === channelId) {
            return res.status(400).json({
                success: false,
                message: "You cannot subscribe to yourself",
            });
        }

        const user = await User.findById(req.user._id);
        const channel = await User.findById(channelId);

        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
            });
        }

        if (user.subscriptions.includes(channelId)) {
            return res.status(400).json({
                success: false,
                message: "Already subscribed",
            });
        }

        user.subscriptions.push(channelId);
        channel.subscribers.push(user._id);

        await user.save();
        await channel.save();

        res.status(200).json({
            success: true,
            message: "Subscribed successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= UNSUBSCRIBE =================
export const unsubscribeFromChannel = async (req, res) => {
    try {
        const { channelId } = req.params;

        const user = await User.findById(req.user._id);
        const channel = await User.findById(channelId);

        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
            });
        }

        user.subscriptions = user.subscriptions.filter(
            (id) => id.toString() !== channelId
        );

        channel.subscribers = channel.subscribers.filter(
            (id) => id.toString() !== req.user._id.toString()
        );

        await user.save();
        await channel.save();

        res.status(200).json({
            success: true,
            message: "Unsubscribed successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= CHECK SUBSCRIPTION =================
export const checkSubscription = async (req, res) => {
    try {
        const { channelId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const subscribed = user.subscriptions.some(
            (id) => id.toString() === channelId
        );

        res.status(200).json({
            success: true,
            subscribed,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const uploadProfilePic = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.profilePic = `/uploads/${req.file.filename}`;

        await user.save();

        res.json({
            success: true,
            profilePic: user.profilePic,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};